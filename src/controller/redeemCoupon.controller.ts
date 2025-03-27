import { Request, Response } from "express";
import { RedeemCoupon } from "../services/redeemCoupon.service";
import { StatusCodes } from "http-status-codes";

export const RedeemCouponController = async (req:Request, res:Response):Promise<void> =>{
    const { userId, couponId, orderId , discountOnId = null } = req.body;
    try {
        if (!userId || !couponId || !orderId) {
            res.status(400).json({ message: "Invalid request data" });
            return;
        }
       
        const RedeemCouponResult = await RedeemCoupon(userId, couponId, orderId, discountOnId);
        res.status(StatusCodes.OK).json({
            message : "redeemed success",
            data: RedeemCouponResult
        })
        return;
    } catch (error) {
        console.log("error in redeemCoupon controller");
        res.status(StatusCodes.BAD_REQUEST).json({ message: error});
    }
}