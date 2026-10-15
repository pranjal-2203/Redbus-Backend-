CREATE TABLE "buses" (
	"id" serial PRIMARY KEY NOT NULL,
	"bus_name" text,
	"from_city" text,
	"to_city" text,
	"travel_date" date,
	"price" integer,
	"total_seats" integer
);
