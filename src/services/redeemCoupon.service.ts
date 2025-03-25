import { couponConnection } from "../dbconfig/dbConfig";
import { Coupon } from "../models/coupon.model";
import { CouponRedemption } from "../models/CouponRedemption";
import { User } from "../models/User.model";

export const RedeemCoupon = async (userId: number, couponId: number, orderId: number, orderAmount: number) => {
    try {
        const userRepo = couponConnection.getRepository(User);
        const couponRepo = couponConnection.getRepository(Coupon);
        const redemptionRepo = couponConnection.getRepository(CouponRedemption);

        // Step 1: Find User & Coupon
        const getUser = await userRepo.findOne({ where: { id: userId } });
        const getCoupon = await couponRepo.findOne({ where: { id: couponId } });

        if (!getUser || !getCoupon) {
            throw new Error("User or Coupon not found");
        }

        // Step 2: Check if the coupon is active and within the valid date range
        const now = new Date();
        if (!getCoupon.isActive || now < getCoupon.validFrom || now > getCoupon.validUntil) {
            throw new Error("Coupon is expired or inactive");
        }

        // Step 3: Check if the user has already redeemed the coupon max times
        const userRedemptions = await redemptionRepo.count({ where: { user: getUser, coupon: getCoupon } });

        if (userRedemptions >= getCoupon.usagePerUser) {
            throw new Error("Coupon usage limit exceeded for this user");
        }

        // Step 4: Check if the order amount meets the minimum purchase requirement
        if (getCoupon.minPurchaseAmount && orderAmount < getCoupon.minPurchaseAmount) {
            throw new Error(`Minimum order amount should be ${getCoupon.minPurchaseAmount}`);
        }

        // Step 5: Calculate Discount
        let discountApplied = 0;
        if (getCoupon.discountType === "percentage") {
            discountApplied = (orderAmount * getCoupon.discountValue) / 100;
            if (getCoupon.maxDiscountAmount) {
                discountApplied = Math.min(discountApplied, getCoupon.maxDiscountAmount);
            }
        } else if (getCoupon.discountType === "fixed") {
            discountApplied = getCoupon.discountValue;
        }

        // Step 6: Save Coupon Redemption Entry
        const newRedemption = redemptionRepo.create({
            user: getUser,
            coupon: getCoupon,
            orderId,
            discountApplied
        });
        await redemptionRepo.save(newRedemption);

        // Step 7: Increase Coupon Redemption Count
        getCoupon.totalRedeemption += 1;
        await couponRepo.save(getCoupon);

        return {
            message: "Coupon redeemed successfully",
            discountApplied,
            redemption: newRedemption
        };
    } catch (error) {
        console.error("Error during coupon redemption:", error);
        throw new Error("Coupon redemption failed");
    }
};
