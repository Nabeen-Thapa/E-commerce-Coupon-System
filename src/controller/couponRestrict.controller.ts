import { Request, Response } from "express";
import { addCouponRestriction } from "../services/couponRestriction.service";
import { StatusCodes } from "http-status-codes";
import { Controller } from "../decorators/controller.decoder";
import { Route } from "../decorators/route.decoder";


@Controller("api/pruduct")
export class CouponRestrictionController {
    @Route("post", "/coupon/restriction")
   async CouponRestriction(req: Request, res: Response): Promise<void>  {
    const { couponId, allowUserRoles, allowPaymentMethods, discountOn, discountOnId = null } = req.body;
    if (!couponId) {
        res.status(400).json({ message: "Coupon ID is required" });
        return;
    }
    try {
        const CouponRestrictionResult = await addCouponRestriction(couponId, allowUserRoles, allowPaymentMethods, discountOn, discountOnId);
        res.status(StatusCodes.ACCEPTED).json({
            message: "coupon restriction added",
            RestrictionDate: CouponRestrictionResult
        })
    } catch (error) {
        console.log("coupon restriction controller error: ", error);
    }
}
}