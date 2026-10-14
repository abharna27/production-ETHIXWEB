import { neon } from "@neondatabase/serverless";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_w4OqA2aYJMGt@ep-floral-mountain-azofd4u2-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";

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
