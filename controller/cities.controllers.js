import { db } from "../configurations/db.config.js";
import { citiesTable } from "../db/cities.db.js";
import { ilike, and, eq } from "drizzle-orm";
const searchCities = async (req, res, next) => {
    try {
        const search = req.query.search || "";
        const cities = await db.select().from(citiesTable).where( and(  ilike(citiesTable.name, `%${search}%`),   eq(citiesTable.isActive, true))) .limit(10);
        return res.status(200).json(cities);
    }
    catch (err) {
        next(err);
    }
};
export default { searchCities };