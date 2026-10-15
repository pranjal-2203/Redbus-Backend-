import {pgTable,serial,text,integer,boolean,timestamp} from "drizzle-orm/pg-core";
export const couponsTable = pgTable("coupons", {
    id: serial("id").primaryKey(),
    code: text("code").unique().notNull(),
    discountType: text("discount_type").notNull(),
    discountValue: integer("discount_value").notNull(),
    minAmount: integer("min_amount").default(0),
    maxDiscount: integer("max_discount"),
    startDate: timestamp("start_date").defaultNow(),
    expiryDate: timestamp("expiry_date"),
    isActive: boolean("is_active").default(true)
});