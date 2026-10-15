CREATE TABLE "coupons" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" text,
	"description" text,
	"discount" integer,
	"is_active" boolean DEFAULT true,
	CONSTRAINT "coupons_code_unique" UNIQUE("code")
);
