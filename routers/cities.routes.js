import express from "express";
import ctrl from "../controller/cities.controllers.js";
const router = express.Router();
router.get("/cities", ctrl.searchCities);
export default router;