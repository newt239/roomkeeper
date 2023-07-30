import { migrate } from "drizzle-orm/vercel-postgres/migrator";

import drizzleConfig from "../../drizzle.config";

import { db } from "./connect";

migrate(db, { migrationsFolder: drizzleConfig.out })
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error("Migrations failed!", err);
    process.exit(1);
  });
