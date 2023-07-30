import { migrate } from "drizzle-orm/vercel-postgres/migrator";

import { db } from "./connect";

migrate(db, { migrationsFolder: "./drizzle" })
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error("Migrations failed!", err);
    process.exit(1);
  });
