import { db } from "../configurations/db.config.js";
import { paymentsTable } from "../db/payments.db.js";
import { bookingsTable } from "../db/bookings.db.js";
import { eq } from "drizzle-orm";
export const createPayment = async (req, res, next) => {
    try {
        const { bookingId,amount,paymentMethod } = req.body;
        if (!bookingId || !amount || !paymentMethod) {
            return res.status(400).json({
                message: "Payment details are required"
            });
        }
        const booking = await db.select().from(bookingsTable).where(eq(bookingsTable.id, Number(bookingId)));
        if (booking.length === 0) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }
        const payment = await db .insert(paymentsTable) .values({  bookingId: Number(bookingId),amount: Number(amount),paymentMethod,status: "success" }).returning();
        return res.status(201).json({
            message: "Payment successful",
            payment: payment[0]
        });
    } catch (err) {
        next(err);
    }
};