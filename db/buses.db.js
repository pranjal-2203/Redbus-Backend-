import { serial, text, date, integer, time, pgTable } from "drizzle-orm/pg-core";
export const busesTable = pgTable("buses", {
    id: serial("id").primaryKey(),
    busName: text("bus_name"),
    operator: text("operator"),
    from: text("from_city"),
    to: text("to_city"),
    travelDate: date("travel_date"),
    departureTime: time("departure_time").notNull(),
    arrivalTime: time("arrival_time").notNull(),
    duration: text("duration").notNull(),
    price: integer("price").notNull(),
    totalSeats: integer("total_seats").notNull(),
});