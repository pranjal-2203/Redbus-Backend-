import express from "express";
import { createPayment } from "../controller/payments.controllers.js";
const router = express.Router();
router.post("/", createPayment);
export default router;