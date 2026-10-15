CREATE TABLE "boarding_points" (
	"id" serial PRIMARY KEY NOT NULL,
	"bus_id" integer NOT NULL,
	"point_type" text NOT NULL,
	"point_name" text NOT NULL
);
