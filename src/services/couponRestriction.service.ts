import { Request, Response } from "express";
import { couponConnection } from "../dbconfig/dbConfig";
import { Coupon } from "../models/coupon.model";
import { CouponRestriction } from "../models/CouponRestriction.model";

export const addCouponRestriction = async (couponId, allowUserRoles, allowPaymentMethods, excludedProductId, excludedCategoryIds) => {
    try {
       

        const getCoupon = await couponConnection.getRepository(Coupon).findOne({ where: { id: couponId } });

        if (!getCoupon) {
            throw new Error("Coupon not found");
        }

        // Create new CouponRestriction entry
        const newRestriction = new CouponRestriction();
        newRestriction.coupon = getCoupon;
        newRestriction.allowUserRoles = allowUserRoles || null;
        newRestriction.allowPymentMethods = allowPaymentMethods || null;
        newRestriction.excludedProductId = excludedProductId || null;
        newRestriction.excludedCategoryIds = excludedCategoryIds || null;

        await couponConnection.getRepository(CouponRestriction).save(newRestriction);

        return { message: "Coupon restriction added successfully", restriction: newRestriction };
    } catch (error) {
        console.error(error);
      throw new Error("Internal Server Error" );
    }
};
