import express from "express";
import { getBoardingPoints } from "../controller/boarding.controllers.js";
const router = express.Router();
router.get("/:busId/points", getBoardingPoints);
export default router;

