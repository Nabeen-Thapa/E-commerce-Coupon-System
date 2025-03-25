import { couponConnection } from "../dbconfig/dbConfig";
import { Coupon } from "../models/coupon.model";
import {authenticator} from "otplib";


export const generateUniqueCoupon = async () => {
    let couponCode: string;
    let sameCoupon: Coupon | null;
    const couponRepo = couponConnection.getRepository(Coupon);
    
    do {
        couponCode = authenticator.generateSecret().slice(0, 6);
        sameCoupon = await couponRepo.findOne({ where: { code: couponCode } });
    } while (sameCoupon); // Keep looping if a coupon with this code exists
    
    return couponCode;
}