import { db } from "../configurations/db.config.js";
import { seatsTable } from "../db/seats.db.js";
import { busesTable } from "../db/buses.db.js";
import { eq, and } from "drizzle-orm";

export const getBusSeats = async (req, res, next) => {
    try {
        const { busId } = req.params;
        if (!busId) {
            return res.status(400).json({
                message: "Bus ID is required"
            });
        }
        const busIdNumber = Number(busId);

        // Bus check
        const [bus] = await db
            .select()
            .from(busesTable)
            .where(eq(busesTable.id, busIdNumber));
        if (!bus) {
            return res.status(404).json({
                message: "Bus not found"
            });
        }

        // Existing seats
        let seats = await db .select() .from(seatsTable) .where(eq(seatsTable.busId, busIdNumber));

        // Agar seats kam hain to missing seats create karo
        if (seats.length < bus.totalSeats) {
            const existingNumbers = new Set(
                seats.map((seat) => seat.seatNumber)
            );
            const newSeats = [];
            for (let i = 1; i <= bus.totalSeats; i++) {
                const seatNumber = String(i);
                if (!existingNumbers.has(seatNumber)) {
                    newSeats.push({
                        busId: busIdNumber,
                        seatNumber,
                        status: "available"
                    });
                }
            }
            if (newSeats.length > 0) {  await db.insert(seatsTable).values(newSeats);}

            // Seats dobara fetch karo
            seats = await db  .select()  .from(seatsTable)  .where(eq(seatsTable.busId, busIdNumber));
        }

        // Sirf totalSeats tak seats bhejo
        seats = seats.slice(0, bus.totalSeats);
        return res.status(200).json({
            message: "Seats fetched successfully",
            seats
        });
    } catch (error) {
        next(error);
    }
};