import { Request, Response } from "express";
import { generateUniqueCoupon } from "../utils/couponCodeGenerator"
import { addCoupon } from "../services/coupon.services";
import { StatusCodes } from "http-status-codes";

export const generateCouponController = async(req:Request, res:Response)=>{
    const couponGenerateResult =await generateUniqueCoupon();
    res.json({message: "your unique coupon code",
        code: couponGenerateResult
    });
}

export const addCouponController = async(req:Request, res:Response):Promise<void>=>{
    const { code, discountType, discountValue, isActive = true, minPurchaseAmount, maxDiscountAmount, validFrom, validUntil, usageLimit = 1, usagePerUser = 1 
    } = req.body;
    if (!code || !discountType || !discountValue || !validFrom || !validUntil) {
         res.status(400).json({ error: "Missing required fields" });
         return;
    }
    try {
        const addCouponResult = await addCoupon( code, discountType, discountValue, isActive, minPurchaseAmount, maxDiscountAmount, validFrom, validUntil, usageLimit, usagePerUser);
        res.status(StatusCodes.ACCEPTED).json({
            message: "coupon addded successfully",
            couponData : addCouponResult
        })
    } catch (error) {
        console.log("add coupon controllero error: ", error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
}
