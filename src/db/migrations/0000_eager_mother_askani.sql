CREATE TABLE IF NOT EXISTS "activities" (
	"id" text PRIMARY KEY NOT NULL,
	"guest_id" text NOT NULL,
	"event_id" text NOT NULL,
	"type" text DEFAULT 'enter' NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL,
	"available" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "events" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"available" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "guests" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"available" boolean DEFAULT true
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "activities" ADD CONSTRAINT "activities_guest_id_guests_id_fk" FOREIGN KEY ("guest_id") REFERENCES "guests"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "activities" ADD CONSTRAINT "activities_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
