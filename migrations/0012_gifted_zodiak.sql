CREATE TABLE "bookings" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"bus_id" integer NOT NULL,
	"seat_id" integer NOT NULL,
	"boarding_point_id" integer NOT NULL,
	"dropping_point_id" integer NOT NULL,
	"passenger_name" text NOT NULL,
	"passenger_age" integer NOT NULL,
	"passenger_gender" text NOT NULL,
	"mobile" text NOT NULL,
	"email" text NOT NULL,
	"amount" integer NOT NULL,
	"status" text DEFAULT 'confirmed' NOT NULL,
	"created_at" timestamp DEFAULT now()
);
