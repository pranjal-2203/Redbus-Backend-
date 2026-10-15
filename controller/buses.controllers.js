import { db } from "../configurations/db.config.js";
import { busesTable } from "../db/buses.db.js";
import { eq, and } from "drizzle-orm";
const searchBuses = async (req, res, next) => {
    try {
        const { from, to, date } = req.query;
        if (!from || !to || !date) {
            return res.status(400).json({
                message: "From, To and Date are required"
            });
        }
        const buses = await db.select().from(busesTable).where(and(eq(busesTable.from, from),eq(busesTable.to, to)) );
        const result = buses.map((bus) => ({ ...bus, travelDate: date}));
        console.log("Buses API response:", result);
        return res.status(200).json({
            message: "Buses found successfully",
            buses: result
        });
    } catch (error) {
        console.log("Search buses error:", error);
        next(error);
    }
};
const popularRoutes = async (req, res, next) => {
    try {
        const buses = await db.select({ from: busesTable.from,to: busesTable.to}).from(busesTable);
        const uniqueRoutes = [];
        buses.forEach((bus) => {
            const exists = uniqueRoutes.some(
                (route) =>
                    route.from === bus.from &&
                    route.to === bus.to
            );
            if (!exists) { uniqueRoutes.push({ from: bus.from, to: bus.to });
            }
        });
        return res.status(200).json({  routes: uniqueRoutes });
    } catch (error) {
        next(error);
    }
};
const governmentBuses = async (req, res, next) => {
    try {
        const { operator } = req.query;
        if (!operator) {
            return res.status(400).json({
                message: "Operator is required"
            });
        }
        const buses = await db .select() .from(busesTable) .where(eq(busesTable.operator, operator));
        return res.status(200).json({
            buses
        });
    } catch (error) {
        next(error);
    }
};
export const getBusById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const [bus] = await db .select() .from(busesTable) .where(eq(busesTable.id, Number(id)));
        if (!bus) {
            return res.status(404).json({
                message: "Bus not found"
            });
        }
        return res.status(200).json({ message: "Bus fetched successfully", bus });
    } catch (error) {
        next(error);
    }
};
export default {searchBuses,popularRoutes,governmentBuses};