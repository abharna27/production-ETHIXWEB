import "dotenv/config";
import { neon } from "@neondatabase/serverless";

const rawUrl = process.env.DATABASE_URL;

export const isDbConfigured = Boolean(
  rawUrl &&
  !rawUrl.includes("placeholder") &&
  rawUrl.startsWith("postgres")
);

const connectionString = isDbConfigured
  ? rawUrl!
  : "postgresql://placeholder:placeholder@localhost:5432/placeholder";

export const sql = neon(connectionString);

export interface LeadRecord {
  id: number;
  name: string;
  email: string;
  phone: string;
  company?: string | null;
  website?: string | null;
  services?: string | null;
  budget?: string | null;
  timing?: string | null;
  description?: string | null;
  source?: string | null;
  country?: string | null;
  status: "new" | "contacted" | "qualified" | "closed" | "archived";
  created_at: string;
  updated_at: string;
}
