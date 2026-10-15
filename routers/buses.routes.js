import express from "express";
import ctrl from "../controller/buses.controllers.js";
const router = express.Router();
router.get("/search", ctrl.searchBuses);
router.get("/popular-routes", ctrl.popularRoutes);
router.get("/government", ctrl.governmentBuses);

export default router;