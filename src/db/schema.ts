import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const guestsTable = pgTable("guests", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  available: boolean("available").default(true),
});

export const activitiesTable = pgTable("activities", {
  id: serial("id").primaryKey(),
  guest_id: text("guest_id").notNull(),
  type: text("type").default("enter"),
  timestamp: timestamp("timestamp").defaultNow(),
  available: boolean("available"),
});
