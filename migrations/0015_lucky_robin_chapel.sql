ALTER TABLE "buses" ALTER COLUMN "departure_time" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "buses" ALTER COLUMN "arrival_time" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "buses" ADD COLUMN "duration" text NOT NULL;