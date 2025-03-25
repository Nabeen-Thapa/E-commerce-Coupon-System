import { Request, Response } from "express";
import { RedeemCoupon } from "../services/redeemCoupon.service";
import { StatusCodes } from "http-status-codes";

const RedeemCouponController = async (req:Request, res:Response):Promise<void> =>{
    const { userId, couponId, orderId, discountApplied } = req.body;
    try {
        if (!userId || !couponId || !orderId || discountApplied === undefined) {
            res.status(400).json({ message: "Invalid request data" });
            return;
        }
        const RedeemCouponResult = await RedeemCoupon(userId, couponId, orderId, discountApplied);
        res.status(StatusCodes.OK).json({
            message : "redeemed success",
            data: RedeemCouponResult
        })
        
    } catch (error) {
        console.log("error in redeemCoupon controller");
    }
}