ALTER TABLE "users" ADD COLUMN "isDeleted" boolean;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "isActive" boolean DEFAULT 'true';