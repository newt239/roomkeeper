import type { Config } from "drizzle-kit";

const drizzleConfig = {
  out: "./src/db/migrations",
  schema: "./src/db/schema.ts",
  breakpoints: true,
} satisfies Config;

export default drizzleConfig;
