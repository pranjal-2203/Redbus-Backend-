import "dotenv/config";
import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function testConnection() {
  try {
    await db.execute("SELECT 1");
    console.log("PostgreSQL connected successfully!");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}



export const db = drizzle(pool);