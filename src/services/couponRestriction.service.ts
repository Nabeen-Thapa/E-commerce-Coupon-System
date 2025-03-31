import { Request, Response } from "express";
import { couponConnection } from "../dbconfig/dbConfig";
import { Coupon } from "../models/coupon.model";
import { CouponRestriction } from "../models/CouponRestriction.model";

export const addCouponRestriction = async (couponId: number, allowUserRoles: string, allowPaymentMethods: string, discountOn:string, discountOnId : number) => {

    //instade of these use discount on
    // excludedProductId: string, excludedCategoryIds: string
    try {
        const couponRepo = couponConnection.getRepository(Coupon);
        const restrictionRepo = couponConnection.getRepository(CouponRestriction);

        // Step 1: Get the Coupon entity using the couponId
        const getCoupon = await couponRepo.findOne({ where: { id: couponId } });

        if (!getCoupon)throw new Error("Coupon not found");

        const newRestriction = restrictionRepo.create({
            coupon: getCoupon,
            allowUserRoles,
            allowPaymentMethods: allowPaymentMethods || null,
            discountOn: discountOn || null,
            discountOnId:discountOnId ||null
        } as Partial<CouponRestriction>);

        await restrictionRepo.save(newRestriction);

        return { message: "Coupon restriction added successfully", restriction: newRestriction };
    } catch (error) {
        console.error(error);
        throw new Error("Internal Server Error");
    }
};