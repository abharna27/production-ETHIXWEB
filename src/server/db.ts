import { neon } from "@neondatabase/serverless";

const connectionString = process.env.DATABASE_URL;

export const sql = connectionString
  ? neon(connectionString)
  : (((..._args: any[]) => {
      throw new Error("DATABASE_URL is not configured in environment variables.");
    }) as unknown as ReturnType<typeof neon>);

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
