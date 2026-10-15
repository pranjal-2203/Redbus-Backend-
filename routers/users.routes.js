import express from "express";
import ctrl from "../controller/users.controllers.js";
import authMiddleware from "../middleware/auth.middleware.js";
const router = express.Router();
router.post("/login", ctrl.login);
router.post("/signup", ctrl.signup);
router.get("/profile", authMiddleware, (req, res) => {
    return res.status(200).json({
        message: "You are authorized",
        user: req.user
    });
});
router.put("/profile", authMiddleware, ctrl.updateProfile);
router.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });

    return res.status(200).json({
        message: "Logout successful"
    });
});

export default router;