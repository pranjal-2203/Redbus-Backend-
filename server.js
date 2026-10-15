import express from "express";
import UserRouter from "./routers/users.routes.js";
import BusRouter from "./routers/buses.routes.js";
import cookieParser from "cookie-parser";
import { testConnection } from "./configurations/db.config.js";
import cors from "cors";
import CitiesRouter from "./routers/cities.routes.js";
import SeatsRouter from "./routers/seats.routes.js";
import BoardingRouter from "./routers/boarding.routes.js";
import BookingsRouter from "./routers/bookings.routes.js";
import PaymentsRouter from "./routers/payments.routes.js";
import CouponsRouter from "./routers/coupons.routes.js";

const port = process.env.PORT;
const app = express();

// Frontend ko backend access karne ki permission
  app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}));
app.use(express.json()); // JSON data read karne ke liye
app.use(cookieParser()); // Cookies read/write karne ke liye

// User routes
app.use("/users", UserRouter);
// Bus routes
app.use("/buses", BusRouter);
app.use("/buses", SeatsRouter);
app.use("/buses", BoardingRouter);
app.use("/bookings", BookingsRouter);
app.use("/payments", PaymentsRouter);
app.use("/coupons",CouponsRouter);

// Error handler
app.use((err, req, res, next) => {
    console.log(err);
    return res.status(400).json("Internal Server Error");
});

// Start server
app.listen(port, () => {
    testConnection();
    console.log(`Server is running at ${port}`);
});

app.use("/cities", CitiesRouter);

