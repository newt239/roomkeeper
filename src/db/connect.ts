import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString, {
  idle_timeout: 10,
  max_lifetime: 30,
});

export const db = drizzle(client);
