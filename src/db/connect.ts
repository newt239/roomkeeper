import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { migrate } from "drizzle-orm/vercel-postgres/migrator";

import drizzleConfig from "../../drizzle.config";

export const db = drizzle(sql);

migrate(db, { migrationsFolder: drizzleConfig.out });
