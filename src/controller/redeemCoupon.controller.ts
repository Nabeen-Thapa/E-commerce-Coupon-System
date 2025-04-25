import { Request, Response } from "express";
import { redeemedServices } from "../services/redeemCoupon.service";
import { StatusCodes } from "http-status-codes";
import { Controller } from "../decorators/controller.decoder";
import { Route } from "../decorators/route.decoder";

@Controller("/api/product")
export class redeemController{
    private redeemService = new redeemedServices();
    @Route("post", "/coupon/redem")

 async RedeemCoupon(req:Request, res:Response):Promise<void>{
    const { userId, couponId, orderId , discountOnId = null } = req.body;
    try {
        if (!userId || !couponId || !orderId) {
            res.status(400).json({ message: "Invalid request data" });
            return;
        }
        const RedeemCouponResult = await this.redeemService.RedeemCoupon(userId, couponId, orderId, discountOnId);
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
}