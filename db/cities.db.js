import { pgTable, serial, text, boolean } from "drizzle-orm/pg-core";
export const citiesTable = pgTable("cities", {
    id: serial("id").primaryKey(),
    name: text("name").notNull().unique(),
    isActive: boolean("is_active").default(true)
});