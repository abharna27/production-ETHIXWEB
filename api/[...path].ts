import type { IncomingMessage, ServerResponse } from "node:http";
import { handleApiRequest } from "../src/server/apiHandler";

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    const handled = await handleApiRequest(req, res);
    if (!handled && !res.writableEnded) {
      res.writeHead(404, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      });
      res.end(JSON.stringify({ success: false, error: "API endpoint not found." }));
    }
  } catch (err: any) {
    if (!res.writableEnded) {
      res.writeHead(500, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      });
      res.end(
        JSON.stringify({
          success: false,
          error: "Internal server error occurred.",
          details: err?.message || String(err),
        })
      );
    }
  }
}
