import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const guestsTable = pgTable("guests", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  available: boolean("available").default(true),
});

export const eventsTable = pgTable("events", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  available: boolean("available").default(true),
});

export const activitiesTable = pgTable("activities", {
  id: text("id").primaryKey(),
  guest_id: text("guest_id")
    .notNull()
    .references(() => guestsTable.id),
  event_id: text("event_id")
    .notNull()
    .references(() => eventsTable.id),
  type: text("type").notNull().default("enter"),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  available: boolean("available").notNull().default(true),
});
