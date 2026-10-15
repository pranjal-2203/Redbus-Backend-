ALTER TABLE "users" RENAME COLUMN "delete" TO "delete_at";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "isDeleted" TO "is_deleted";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "isActive" TO "is_active";