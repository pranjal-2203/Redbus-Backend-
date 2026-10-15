import { db } from "../configurations/db.config.js";
import { boardingTable } from "../db/boarding.db.js";
import { eq } from "drizzle-orm";
export const getBoardingPoints = async (req, res, next) => {
    try {
        const { busId } = req.params;
        const points = await db .select().from(boardingTable) .where(eq(boardingTable.busId, Number(busId)));
        const boardingPoints = points.filter(
            (point) => point.pointType === "boarding"
        );
        const droppingPoints = points.filter(
            (point) => point.pointType === "dropping"
        );
        return res.status(200).json({
            message: "Boarding and dropping points fetched successfully",
            boardingPoints,
            droppingPoints
        });
    } catch (err) {
        next(err);
    }
};