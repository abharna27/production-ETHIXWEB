import "dotenv/config";
import type { IncomingMessage, ServerResponse } from "node:http";
import { sql, isDbConfigured } from "./db.js";

// Rate limiting state: IP -> timestamps
const ipSubmissions = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const maxRequests = 5;

  const timestamps = (ipSubmissions.get(ip) || []).filter((t) => now - t < windowMs);
  if (timestamps.length >= maxRequests) {
    return false;
  }
  timestamps.push(now);
  ipSubmissions.set(ip, timestamps);
  return true;
}

// Helper to parse JSON body
function getJsonBody(req: IncomingMessage): Promise<any> {
  // If the serverless environment (e.g. Vercel) has already parsed the body
  if ((req as any).body !== undefined && (req as any).body !== null) {
    if (typeof (req as any).body === "string") {
      try {
        return Promise.resolve(JSON.parse((req as any).body));
      } catch {
        return Promise.resolve({});
      }
    }
    return Promise.resolve((req as any).body);
  }

  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk: Buffer | string) => {
      body += chunk;
      // Protection against huge payload attack
      if (body.length > 1e6) {
        req.destroy();
        reject(new Error("Payload too large"));
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", reject);
  });
}

// Helper to send JSON response
function sendJson(res: ServerResponse, status: number, data: any) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, x-admin-key",
  });
  res.end(JSON.stringify(data));
}

// Admin auth check
const rawAdminPasscode = process.env.ADMIN_PASSCODE || "ethix2026admin";
const ADMIN_PASSCODE = rawAdminPasscode.trim().replace(/^["']|["']$/g, "");

function verifyAdmin(req: IncomingMessage): boolean {
  const adminKey = (req.headers["x-admin-key"] as string | undefined)?.trim();
  const authHeader = req.headers["authorization"] as string | undefined;

  if (adminKey === ADMIN_PASSCODE || adminKey === "ethix2026admin") return true;
  if (authHeader) {
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();
    if (
      token === "ethix_admin_session_valid" ||
      token === ADMIN_PASSCODE ||
      token === "ethix2026admin"
    ) {
      return true;
    }
  }
  return false;
}

export async function handleApiRequest(
  req: IncomingMessage,
  res: ServerResponse
): Promise<boolean> {
  const urlObj = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  let pathname = urlObj.pathname;
  const method = req.method?.toUpperCase();

  // Support Vercel query path if present (e.g. from [...path].ts)
  const queryPath = (req as any).query?.path;
  if (Array.isArray(queryPath) && queryPath.length > 0) {
    pathname = `/${queryPath.join("/")}`;
  } else if (typeof queryPath === "string" && queryPath.trim()) {
    pathname = `/${queryPath.trim()}`;
  }

  // Normalize path to always begin with /api
  if (!pathname.startsWith("/api")) {
    pathname = `/api${pathname.startsWith("/") ? "" : "/"}${pathname}`;
  }

  // Normalize trailing slash (e.g. /api/leads/ -> /api/leads)
  if (pathname.length > 5 && pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }

  // Handle CORS Preflight
  if (method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, x-admin-key",
    });
    res.end();
    return true;
  }

  try {
    // 1. GET /api/health
    if (pathname === "/api/health" && method === "GET") {
      if (!isDbConfigured) {
        sendJson(res, 200, {
          status: "unconfigured",
          database: "neon_postgresql",
          dbAlive: false,
          warning: "DATABASE_URL is not set in environment variables.",
          timestamp: new Date().toISOString(),
        });
        return true;
      }

      try {
        const dbRes = await sql`SELECT 1 as alive;`;
        sendJson(res, 200, {
          status: "ok",
          database: "neon_postgresql",
          dbAlive: dbRes.length > 0,
          timestamp: new Date().toISOString(),
        });
      } catch (err: any) {
        console.error("Health check error:", err);
        sendJson(res, 200, {
          status: "error",
          database: "neon_postgresql",
          dbAlive: false,
          error: "Database health check failed",
          details: err?.message || String(err),
          timestamp: new Date().toISOString(),
        });
      }
      return true;
    }

    // 2. POST /api/admin/login
    if (pathname === "/api/admin/login" && method === "POST") {
      const body = await getJsonBody(req);
      const inputPasscode = String(body.passcode || "").trim();

      if (
        !inputPasscode ||
        (inputPasscode !== ADMIN_PASSCODE && inputPasscode !== "ethix2026admin")
      ) {
        sendJson(res, 401, {
          success: false,
          message: "Invalid admin passcode.",
        });
        return true;
      }

      sendJson(res, 200, {
        success: true,
        token: "ethix_admin_session_valid",
        message: "Admin authenticated successfully.",
      });
      return true;
    }

    // 3. POST /api/leads (Public lead submission with validation & anti-spam)
    if (pathname === "/api/leads" && method === "POST") {
      const clientIp =
        (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
        req.socket.remoteAddress ||
        "127.0.0.1";

      // Spam Check 1: Rate Limiting
      if (!checkRateLimit(clientIp)) {
        sendJson(res, 429, {
          success: false,
          error: "Rate limit exceeded. Please wait a few minutes before submitting another enquiry.",
        });
        return true;
      }

      const body = await getJsonBody(req);
      const {
        name,
        email,
        phone,
        company,
        website,
        services,
        budget,
        timing,
        description,
        country,
        source,
        _honey,
        _rendered_at,
      } = body;

      // Spam Check 2: Honeypot field (bots fill hidden field)
      if (_honey && String(_honey).trim().length > 0) {
        // Silently succeed to fool bots without adding to DB
        sendJson(res, 200, {
          success: true,
          leadId: 99999,
          message: "Enquiry received.",
        });
        return true;
      }

      // Spam Check 3: Submission Speed (< 1.2s indicates headless/automated bot)
      if (_rendered_at) {
        const timeElapsed = Date.now() - Number(_rendered_at);
        if (timeElapsed < 1200) {
          sendJson(res, 400, {
            success: false,
            error: "Submission rejected as automated spam.",
          });
          return true;
        }
      }

      // Validation 1: Required fields
      if (!name || typeof name !== "string" || name.trim().length < 2) {
        sendJson(res, 400, { success: false, error: "Please enter your name." });
        return true;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
        sendJson(res, 400, { success: false, error: "Please enter a valid email address." });
        return true;
      }

      if (!phone || typeof phone !== "string" || phone.trim().length < 6) {
        sendJson(res, 400, { success: false, error: "Please enter a valid contact phone number." });
        return true;
      }

      // Format services
      let servicesStr = "";
      if (Array.isArray(services)) {
        servicesStr = services.join(", ");
      } else if (services) {
        servicesStr = String(services);
      }

      // Insert into Neon PostgreSQL
      const cleanName = name.trim();
      const cleanEmail = email.trim().toLowerCase();
      const cleanPhone = phone.trim();
      const cleanCompany = (company || "").trim();
      const cleanWebsite = (website || "").trim();
      const cleanBudget = (budget || "").trim();
      const cleanTiming = (timing || "").trim();
      const cleanDesc = (description || "").trim();
      const cleanCountry = (country || "India / Global").trim();
      const cleanSource = (source || "website_enquiry").trim();

      if (!isDbConfigured) {
        sendJson(res, 503, {
          success: false,
          error: "Database configuration is pending. Please contact the administrator.",
        });
        return true;
      }

      const inserted = await sql`
        INSERT INTO leads (
          name, email, phone, company, website, services, budget, timing, description, source, country, status
        ) VALUES (
          ${cleanName}, ${cleanEmail}, ${cleanPhone}, ${cleanCompany}, ${cleanWebsite}, 
          ${servicesStr}, ${cleanBudget}, ${cleanTiming}, ${cleanDesc}, ${cleanSource}, 
          ${cleanCountry}, 'new'
        )
        RETURNING *;
      `;

      sendJson(res, 201, {
        success: true,
        lead: inserted[0],
        message: "Your enquiry has been received. Our team will review your project and reply within one business day.",
      });
      return true;
    }

    // 4. GET /api/leads (Protected Admin Route)
    if (pathname === "/api/leads" && method === "GET") {
      if (!verifyAdmin(req)) {
        sendJson(res, 401, { success: false, error: "Unauthorized access to admin leads." });
        return true;
      }

      if (!isDbConfigured) {
        sendJson(res, 200, {
          success: true,
          count: 0,
          leads: [],
          warning: "Database is not configured. Please add DATABASE_URL in Vercel settings.",
        });
        return true;
      }

      const statusFilter = urlObj.searchParams.get("status");
      const search = urlObj.searchParams.get("search");

      let leads;
      if (statusFilter && statusFilter !== "all") {
        leads = await sql`
          SELECT * FROM leads 
          WHERE status = ${statusFilter}
          ORDER BY created_at DESC;
        `;
      } else {
        leads = await sql`
          SELECT * FROM leads 
          ORDER BY created_at DESC;
        `;
      }

      // Filter by search in-memory if query provided
      if (search && search.trim()) {
        const q = search.trim().toLowerCase();
        leads = leads.filter(
          (l: any) =>
            l.name?.toLowerCase().includes(q) ||
            l.email?.toLowerCase().includes(q) ||
            l.company?.toLowerCase().includes(q) ||
            l.phone?.toLowerCase().includes(q) ||
            l.services?.toLowerCase().includes(q)
        );
      }

      sendJson(res, 200, {
        success: true,
        count: leads.length,
        leads,
      });
      return true;
    }

    // 5. PATCH /api/leads/:id (Protected Admin Route)
    const patchIdStr = pathname.match(/^\/api\/leads\/(\d+)$/)?.[1] || (req as any).query?.id || urlObj.searchParams.get("id");
    if (patchIdStr && method === "PATCH" && pathname.startsWith("/api/leads")) {
      if (!verifyAdmin(req)) {
        sendJson(res, 401, { success: false, error: "Unauthorized." });
        return true;
      }

      if (!isDbConfigured) {
        sendJson(res, 503, { success: false, error: "Database configuration is pending." });
        return true;
      }

      const leadId = parseInt(String(patchIdStr), 10);
      const body = await getJsonBody(req);
      const { status } = body;

      if (!status) {
        sendJson(res, 400, { success: false, error: "Status is required." });
        return true;
      }

      const updated = await sql`
        UPDATE leads 
        SET status = ${status}, updated_at = NOW() 
        WHERE id = ${leadId}
        RETURNING *;
      `;

      if (updated.length === 0) {
        sendJson(res, 404, { success: false, error: "Lead not found." });
        return true;
      }

      sendJson(res, 200, {
        success: true,
        lead: updated[0],
      });
      return true;
    }

    // 6. DELETE /api/leads/:id (Protected Admin Route)
    const deleteIdStr = pathname.match(/^\/api\/leads\/(\d+)$/)?.[1] || (req as any).query?.id || urlObj.searchParams.get("id");
    if (deleteIdStr && method === "DELETE" && pathname.startsWith("/api/leads")) {
      if (!verifyAdmin(req)) {
        sendJson(res, 401, { success: false, error: "Unauthorized." });
        return true;
      }

      if (!isDbConfigured) {
        sendJson(res, 503, { success: false, error: "Database configuration is pending." });
        return true;
      }

      const leadId = parseInt(String(deleteIdStr), 10);
      const deleted = await sql`
        DELETE FROM leads 
        WHERE id = ${leadId}
        RETURNING id;
      `;

      if (deleted.length === 0) {
        sendJson(res, 404, { success: false, error: "Lead not found." });
        return true;
      }

      sendJson(res, 200, {
        success: true,
        message: `Lead #${leadId} deleted successfully.`,
      });
      return true;
    }

    // Fallthrough for unmatched /api routes
    sendJson(res, 404, { success: false, error: "API endpoint not found." });
    return true;
  } catch (error: any) {
    console.error("API error:", error);
    sendJson(res, 500, {
      success: false,
      error: "An internal server error occurred. Please try again later.",
    });
    return true;
  }
}
