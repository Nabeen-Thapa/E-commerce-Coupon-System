import { Request, Response } from "express";
import { addCouponRestriction } from "../services/couponRestriction.service";
import { StatusCodes } from "http-status-codes";

const CouponRestrictionController = async(req:Request, res:Response):Promise<void> =>{
     const { couponId, allowUserRoles, allowPaymentMethods, excludedProductId, excludedCategoryIds } = req.body;
            if (!couponId) {
                res.status(400).json({ message: "Coupon ID is required" });
                return;
            }
            try {
                const CouponRestrictionResult = await addCouponRestriction(couponId, allowUserRoles, allowPaymentMethods, excludedProductId, excludedCategoryIds);
                res.status(StatusCodes.ACCEPTED).json({message: "coupon restriction added",
                    RestrictionDate: CouponRestrictionResult
                })
            } catch (error) {
                console.log("coupon restriction controller error: ", error);
            }

}