import { db } from "../configurations/db.config.js";
import { bookingsTable } from "../db/bookings.db.js";
import { seatsTable } from "../db/seats.db.js";
import { eq, and } from "drizzle-orm";
export const createBooking = async (req, res, next) => {
    try {
        const {
            userId,
            busId,
            seatId,
            boardingPointId,
            droppingPointId,
            passengerName,
            passengerAge,
            passengerGender,
            mobile,
            email,
            amount
        } = req.body;

        if (
            !userId ||
            !busId ||
            !seatId ||
            !boardingPointId ||
            !droppingPointId ||
            !passengerName ||
            !passengerAge ||
            !passengerGender ||
            !mobile ||
            !email ||
            amount == null
        ) {
            return res.status(400).json({
                message: "All booking details are required"
            });
        }
        const seat = await db.select().from(seatsTable).where(and(eq(seatsTable.id, Number(seatId)),eq(seatsTable.busId, Number(busId))) );
        if (seat.length === 0) {
            return res.status(404).json({
                message: "Seat not found"
            });
        }
        if (seat[0].status === "booked") {
            return res.status(400).json({
                message: "Seat is already booked"
            });
        }
        const booking = await db.insert(bookingsTable).values({
                userId: Number(userId),
                busId: Number(busId),
                seatId: Number(seatId),
                boardingPointId: Number(boardingPointId),
                droppingPointId: Number(droppingPointId),
                passengerName,
                passengerAge: Number(passengerAge),
                passengerGender,
                mobile,
                email: email.trim(),
                amount: Number(amount),
                status: "confirmed"
            })
            .returning();
        await db.update(seatsTable).set({ status: "booked" }).where(eq(seatsTable.id, Number(seatId)));
        return res.status(201).json({
            message: "Booking created successfully",
            booking: booking[0]
        });
    } catch (err) {
        next(err);
    }
};
// Find booking using Booking ID and Email
export const lookupBooking = async (req, res, next) => {
    try {
        const { bookingId, email } = req.query;
        const id = Number(bookingId);
        if (
            !bookingId ||
            !Number.isInteger(id) ||
            id <= 0 ||
            !email ||
            typeof email !== "string"
        ) {
            return res.status(400).json({
                message: "Valid Booking ID and Email are required"
            });
        }
        const booking = await db.select().from(bookingsTable).where(and(eq(bookingsTable.id, id), eq(bookingsTable.email, email.trim()) ) );
        if (booking.length === 0) {
            return res.status(404).json({
                message: "Booking not found. Please check Booking ID and Email."
            });
        }
        return res.status(200).json({
            message: "Booking found successfully",
            booking: booking[0]
        });
    } catch (err) {
        next(err);
    }
};

export const getBooking = async (req, res, next) => {
    try {
        const { id } = req.params;
        const booking = await db.select().from(bookingsTable).where(eq(bookingsTable.id, Number(id)));
        if (booking.length === 0) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }
        return res.status(200).json({
            message: "Booking fetched successfully",
            booking: booking[0]
        });
    } catch (err) {
        next(err);
    }
};

export const getMyBookings = async (req, res, next) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({
                message: "User ID is required"
            });
      }
        const bookings = await db.select().from(bookingsTable).where(eq(bookingsTable.userId, Number(userId)));
        return res.status(200).json({
            message: "Bookings fetched successfully",
            bookings
        });
    } catch (err) {
        next(err);
    }
};

export const updateBooking = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {passengerName,passengerAge, passengerGender,mobile,email  } = req.body;
        const booking = await db.update(bookingsTable)
            .set({passengerName, passengerAge: Number(passengerAge),passengerGender,mobile,email
            }).where(eq(bookingsTable.id, Number(id))).returning();
        if (booking.length === 0) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }
        return res.status(200).json({
            message: "Booking updated successfully",
            booking: booking[0]
        });
    } catch (err) {
        next(err);
    }
};

export const cancelBooking = async (req, res, next) => {
    try {
        const { id } = req.params;
        const booking = await db.select().from(bookingsTable).where(eq(bookingsTable.id, Number(id)));
        if (booking.length === 0) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }
        if (
            booking[0].status === "cancelled" ||
            booking[0].status === "refunded"
        ) {
            return res.status(400).json({
                message: "Booking is already cancelled or refunded"
            });
        }
        await db.update(bookingsTable).set({ status: "cancelled" }).where(eq(bookingsTable.id, Number(id)));
        await db.update(seatsTable) .set({ status: "available" }) .where(eq(seatsTable.id, booking[0].seatId));
        return res.status(200).json({
            message: "Booking cancelled successfully",
            refundAmount: booking[0].amount
        });
    } catch (err) {
        next(err);
    }
};

export const refundBooking = async (req, res, next) => {
    try {
        const { id } = req.params;
        const booking = await db.select().from(bookingsTable).where(eq(bookingsTable.id, Number(id)));
        if (booking.length === 0) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }
        if (booking[0].status !== "cancelled") {
            return res.status(400).json({
                message: "Booking must be cancelled before refund"
            });
        }
        await db.update(bookingsTable).set({ status: "refunded" }).where(eq(bookingsTable.id, Number(id)));
        return res.status(200).json({
            message: "Refund processed successfully",
            refundAmount: booking[0].amount
        });
    } catch (err) {
        next(err);
    }
};

export const deleteBooking = async (req, res, next) => {
    try {
        const { id } = req.params;
        const booking = await db.select() .from(bookingsTable).where(eq(bookingsTable.id, Number(id)));
        if (booking.length === 0) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }
        await db.update(seatsTable) .set({ status: "available" }) .where(eq(seatsTable.id, booking[0].seatId));
        await db.delete(bookingsTable).where(eq(bookingsTable.id, Number(id)));
        return res.status(200).json({
            message: "Booking deleted successfully"
        });
    } catch (err) {
        next(err);
    }
};
