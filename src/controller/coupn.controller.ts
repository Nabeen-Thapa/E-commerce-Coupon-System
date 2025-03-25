import { Request, Response } from "express";
import { generateUniqueCoupon } from "../utils/couponCodeGenerator"

export const generateCouponController = async(req:Request, res:Response)=>{
    const couponGenerateResult =await generateUniqueCoupon();
    res.json({message: "your unique coupon code",
        code: couponGenerateResult
    });
}