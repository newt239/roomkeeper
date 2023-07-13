import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const guestsTable = pgTable("guests", {
  id: serial("id").primaryKey(),
  name: text("name"),
  available: boolean("available"),
});

export const activitiesTable = pgTable("activities", {
  id: serial("id").primaryKey(),
  guest_id: text("guest_id"),
  type: text("type"),
  timestamp: timestamp("timestamp"),
  available: boolean("available"),
});
