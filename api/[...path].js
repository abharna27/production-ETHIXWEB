// src/server/apiHandler.ts
import "dotenv/config";

// src/server/db.ts
import "dotenv/config";
import { neon } from "@neondatabase/serverless";
var rawUrl = process.env.DATABASE_URL;
var isDbConfigured = Boolean(
  rawUrl && !rawUrl.includes("placeholder") && rawUrl.startsWith("postgres")
);
var connectionString = isDbConfigured ? rawUrl : "postgresql://placeholder:placeholder@localhost:5432/placeholder";
var sql = neon(connectionString);

// src/server/apiHandler.ts
var ipSubmissions = /* @__PURE__ */ new Map();
function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1e3;
  const maxRequests = 5;
  const timestamps = (ipSubmissions.get(ip) || []).filter((t) => now - t < windowMs);
  if (timestamps.length >= maxRequests) {
    return false;
  }
  timestamps.push(now);
  ipSubmissions.set(ip, timestamps);
  return true;
}
function getJsonBody(req) {
  if (req.body !== void 0 && req.body !== null) {
    if (typeof req.body === "string") {
      try {
        return Promise.resolve(JSON.parse(req.body));
      } catch {
        return Promise.resolve({});
      }
    }
    return Promise.resolve(req.body);
  }
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
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
function sendJson(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, x-admin-key"
  });
  res.end(JSON.stringify(data));
}
var ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "ethix2026admin";
function verifyAdmin(req) {
  const adminKey = req.headers["x-admin-key"];
  const authHeader = req.headers["authorization"];
  if (adminKey === ADMIN_PASSCODE) return true;
  if (authHeader) {
    const token = authHeader.replace(/^Bearer\s+/i, "");
    if (token === "ethix_admin_session_valid" || token === ADMIN_PASSCODE) {
      return true;
    }
  }
  return false;
}
async function handleApiRequest(req, res) {
  const urlObj = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  let pathname = urlObj.pathname;
  const method = req.method?.toUpperCase();
  const queryPath = req.query?.path;
  if (Array.isArray(queryPath) && queryPath.length > 0) {
    pathname = `/${queryPath.join("/")}`;
  } else if (typeof queryPath === "string" && queryPath.trim()) {
    pathname = `/${queryPath.trim()}`;
  }
  if (!pathname.startsWith("/api")) {
    pathname = `/api${pathname.startsWith("/") ? "" : "/"}${pathname}`;
  }
  if (pathname.length > 5 && pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }
  if (method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, x-admin-key"
    });
    res.end();
    return true;
  }
  try {
    if (pathname === "/api/health" && method === "GET") {
      if (!isDbConfigured) {
        sendJson(res, 200, {
          status: "unconfigured",
          database: "neon_postgresql",
          dbAlive: false,
          warning: "DATABASE_URL is not set in environment variables.",
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
        return true;
      }
      try {
        const dbRes = await sql`SELECT 1 as alive;`;
        sendJson(res, 200, {
          status: "ok",
          database: "neon_postgresql",
          dbAlive: dbRes.length > 0,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
      } catch (err) {
        console.error("Health check error:", err);
        sendJson(res, 200, {
          status: "error",
          database: "neon_postgresql",
          dbAlive: false,
          error: "Database health check failed",
          details: err?.message || String(err),
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
      }
      return true;
    }
    if (pathname === "/api/admin/login" && method === "POST") {
      const body = await getJsonBody(req);
      const { passcode } = body;
      if (!passcode || passcode !== ADMIN_PASSCODE) {
        sendJson(res, 401, {
          success: false,
          message: "Invalid admin passcode."
        });
        return true;
      }
      sendJson(res, 200, {
        success: true,
        token: "ethix_admin_session_valid",
        message: "Admin authenticated successfully."
      });
      return true;
    }
    if (pathname === "/api/leads" && method === "POST") {
      const clientIp = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.socket.remoteAddress || "127.0.0.1";
      if (!checkRateLimit(clientIp)) {
        sendJson(res, 429, {
          success: false,
          error: "Rate limit exceeded. Please wait a few minutes before submitting another enquiry."
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
        _rendered_at
      } = body;
      if (_honey && String(_honey).trim().length > 0) {
        sendJson(res, 200, {
          success: true,
          leadId: 99999,
          message: "Enquiry received."
        });
        return true;
      }
      if (_rendered_at) {
        const timeElapsed = Date.now() - Number(_rendered_at);
        if (timeElapsed < 1200) {
          sendJson(res, 400, {
            success: false,
            error: "Submission rejected as automated spam."
          });
          return true;
        }
      }
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
      let servicesStr = "";
      if (Array.isArray(services)) {
        servicesStr = services.join(", ");
      } else if (services) {
        servicesStr = String(services);
      }
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
          error: "Database configuration is pending. Please contact the administrator."
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
        message: "Your enquiry has been received. Our team will review your project and reply within one business day."
      });
      return true;
    }
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
          warning: "Database is not configured. Please add DATABASE_URL in Vercel settings."
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
      if (search && search.trim()) {
        const q = search.trim().toLowerCase();
        leads = leads.filter(
          (l) => l.name?.toLowerCase().includes(q) || l.email?.toLowerCase().includes(q) || l.company?.toLowerCase().includes(q) || l.phone?.toLowerCase().includes(q) || l.services?.toLowerCase().includes(q)
        );
      }
      sendJson(res, 200, {
        success: true,
        count: leads.length,
        leads
      });
      return true;
    }
    const patchMatch = pathname.match(/^\/api\/leads\/(\d+)$/);
    if (patchMatch && method === "PATCH") {
      if (!verifyAdmin(req)) {
        sendJson(res, 401, { success: false, error: "Unauthorized." });
        return true;
      }
      if (!isDbConfigured) {
        sendJson(res, 503, { success: false, error: "Database configuration is pending." });
        return true;
      }
      const leadId = parseInt(patchMatch[1], 10);
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
        lead: updated[0]
      });
      return true;
    }
    const deleteMatch = pathname.match(/^\/api\/leads\/(\d+)$/);
    if (deleteMatch && method === "DELETE") {
      if (!verifyAdmin(req)) {
        sendJson(res, 401, { success: false, error: "Unauthorized." });
        return true;
      }
      if (!isDbConfigured) {
        sendJson(res, 503, { success: false, error: "Database configuration is pending." });
        return true;
      }
      const leadId = parseInt(deleteMatch[1], 10);
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
        message: `Lead #${leadId} deleted successfully.`
      });
      return true;
    }
    sendJson(res, 404, { success: false, error: "API endpoint not found." });
    return true;
  } catch (error) {
    console.error("API error:", error);
    sendJson(res, 500, {
      success: false,
      error: "An internal server error occurred. Please try again later."
    });
    return true;
  }
}

// api/[...path].ts
async function handler(req, res) {
  try {
    const handled = await handleApiRequest(req, res);
    if (!handled && !res.writableEnded) {
      res.writeHead(404, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      });
      res.end(JSON.stringify({ success: false, error: "API endpoint not found." }));
    }
  } catch (err) {
    if (!res.writableEnded) {
      res.writeHead(500, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      });
      res.end(
        JSON.stringify({
          success: false,
          error: "Internal server error occurred.",
          details: err?.message || String(err)
        })
      );
    }
  }
}
export {
  handler as default
};
