import { db } from "../configurations/db.config.js";
import { couponsTable } from "../db/coupons.db.js";
import { eq } from "drizzle-orm";
const getCoupons = async (req, res, next) => {
    try {
        const coupons = await db.select().from(couponsTable).where(eq(couponsTable.isActive, true));
        return res.status(200).json({
            coupons
        });
    } catch (error) {
        next(error);
    }
};
const validateCoupon = async (req, res, next) => {
    try {
        const { code, amount } = req.body;
        if (!code || !amount) {
            return res.status(400).json({
                message: "Coupon code and amount are required"
            });
        }
        const [coupon] = await db .select().from(couponsTable).where(eq(couponsTable.code, code.toUpperCase()));
        if (!coupon) {
            return res.status(404).json({
                message: "Invalid coupon code"
            });
        }
        if (!coupon.isActive) {
            return res.status(400).json({
                message: "Coupon is inactive"
            });
        }
        const currentDate = new Date();
        if (
            coupon.startDate &&
            currentDate < new Date(coupon.startDate)
        ) {
            return res.status(400).json({
                message: "Coupon is not active yet"
            });
        }
        if (
            coupon.expiryDate &&
            currentDate > new Date(coupon.expiryDate)
        ) {
            return res.status(400).json({
                message: "Coupon has expired"
            });
        }
        if (amount < coupon.minAmount) {
            return res.status(400).json({
                message: `Minimum booking amount is ₹${coupon.minAmount}`
            });
        }
        let discount = 0;
        if (coupon.discountType === "FLAT") {
            discount = coupon.discountValue;
        }
        if (coupon.discountType === "PERCENTAGE") {
            discount = (amount * coupon.discountValue) / 100;
            if (
                coupon.maxDiscount &&
                discount > coupon.maxDiscount
            ) {
                discount = coupon.maxDiscount;
            }
        }
        if (discount > amount) {
            discount = amount;
        }
        const finalAmount = amount - discount;
        return res.status(200).json({
            message: "Coupon applied successfully",
            coupon: {
                id: coupon.id,
                code: coupon.code,
                discountType: coupon.discountType,
                discountValue: coupon.discountValue
            },
            discount: Math.round(discount),
            finalAmount: Math.round(finalAmount)
        });
    } catch (error) {
        next(error);
    }
};
export default {getCoupons,validateCoupon};