import express from "express";
import {createBooking,getBooking,lookupBooking,getMyBookings,updateBooking,cancelBooking,refundBooking,deleteBooking} from "../controller/bookings.controllers.js";
const router = express.Router();
router.post("/", createBooking);
router.get("/my-bookings", getMyBookings);
router.get("/lookup", lookupBooking);
router.get("/:id", getBooking);
router.put("/:id", updateBooking);
router.patch("/:id/cancel", cancelBooking);
router.patch("/:id/refund", refundBooking);
router.delete("/:id",deleteBooking)

export default router;

 