import express from "express";
import ctrl from "../controller/coupons.controllers.js";

const router = express.Router();

router.get("/", ctrl.getCoupons);

router.post("/validate", ctrl.validateCoupon);

export default router;