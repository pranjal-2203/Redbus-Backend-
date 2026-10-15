import express from "express";
import { getBusSeats } from "../controller/seats.controllers.js";
const router = express.Router();
router.get("/:busId/seats", getBusSeats);
export default router;