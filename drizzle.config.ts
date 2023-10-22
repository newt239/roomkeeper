import "dotenv/config";
import type { Config } from "drizzle-kit";

const drizzleConfig = {
  out: "./src/db/migrations",
  schema: "./src/db/schema.ts",
  breakpoints: true,
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;

export default drizzleConfig;
