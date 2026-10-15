ALTER TABLE "users" RENAME COLUMN "phone no" TO "phone_no";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_phone no_unique";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_phone_no_unique" UNIQUE("phone_no");