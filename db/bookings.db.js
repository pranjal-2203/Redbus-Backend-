import { serial, integer,text,timestamp, pgTable} from "drizzle-orm/pg-core";
export const bookingsTable = pgTable("bookings", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull(),
    busId: integer("bus_id").notNull(),
    seatId: integer("seat_id").notNull(),
    boardingPointId: integer("boarding_point_id").notNull(),
    droppingPointId: integer("dropping_point_id").notNull(),
    passengerName: text("passenger_name").notNull(),
    passengerAge: integer("passenger_age").notNull(),
    passengerGender: text("passenger_gender").notNull(),
    mobile: text("mobile").notNull(),
    email: text("email").notNull(),
    amount: integer("amount").notNull(),
    status: text("status").notNull().default("confirmed"),
    createdAt: timestamp("created_at").defaultNow()
});

