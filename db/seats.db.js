import { serial, integer, text, pgTable } from "drizzle-orm/pg-core";
export const seatsTable = pgTable("seats", {
    id: serial("id").primaryKey(),
    busId: integer("bus_id").notNull(),
    seatNumber: text("seat_number").notNull(),
    status: text("status").notNull().default("available")
});