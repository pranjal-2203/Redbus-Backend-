import { serial, integer, text, pgTable } from "drizzle-orm/pg-core";
export const boardingTable = pgTable("boarding_points", {
    id: serial("id").primaryKey(),
    busId: integer("bus_id").notNull(),
    pointType: text("point_type").notNull(),
    pointName: text("point_name").notNull()
});