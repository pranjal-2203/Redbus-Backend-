import {serial,integer,text,timestamp,pgTable} from "drizzle-orm/pg-core";
export const paymentsTable = pgTable("payments", {
    id: serial("id").primaryKey(),
    bookingId: integer("booking_id").notNull(),
    amount: integer("amount").notNull(),
    paymentMethod: text("payment_method").notNull(),
    status: text("status").notNull().default("success"),
    createdAt: timestamp("created_at").defaultNow()
});