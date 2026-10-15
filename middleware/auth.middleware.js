import jwt from "jsonwebtoken";

// JWT token check karne ke liye middleware
const authMiddleware = (req, res, next) => {
    try {

        // Cookie se token le rahe hain
        const token = req.cookies.token;

        // Token nahi mila
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        // JWT token verify kar rahe hain
        const user = jwt.verify(token, process.env.JWT_SECRET);

        // User ki information request mein save kar rahe hain
        req.user = user;

        // Next function par jao
        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

export default authMiddleware;