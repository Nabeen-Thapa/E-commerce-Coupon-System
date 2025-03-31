import { subDays } from "date-fns";
import { couponConnection } from "../dbconfig/dbConfig";
import { Coupon } from "../models/coupon.model";
import { CouponRestriction } from "../models/CouponRestriction.model";
import { Order } from "../models/order.model";
import { Product } from "../models/product.model";
import { User } from "../models/User.model";
import { userType } from "../types/userTypes.type";
import { discountOn } from "../types/discount.type";
import { CouponRedemption } from "../models/CouponRedemption";

export const couponValidation = async (userId: number, couponId: number, orderId: number, discountOnId: number) => {
    try {
        const userRepo = couponConnection.getRepository(User);
        const couponRepo = couponConnection.getRepository(Coupon);
        const restrictionRepo = couponConnection.getRepository(CouponRestriction);
        const orderRepo = couponConnection.getRepository(Order);
        const productRepo = couponConnection.getRepository(Product);
        const redemptionRepo = couponConnection.getRepository(CouponRedemption);

        const order = await orderRepo.findOne({ where: { id: orderId } });
        const user = await userRepo.findOne({ where: { id: userId } });
        const coupon = await couponRepo.findOne({ where: { id: couponId } });

        if (!order) throw new Error("Order not found");
        if (!user) throw new Error("User n not found");
        if (!coupon) throw new Error(" Coupon not found");

        const now = new Date();
        if (!coupon.isActive || now < coupon.validFrom || now > coupon.validUntil)
            throw new Error("Coupon is expired or inactive");

        if (coupon.totalRedeemption >= coupon.usageLimit)
            throw new Error("This coupon has reached its maximum redemption limit");

        const userRedemptions = await redemptionRepo.count({ where: { user: user, coupon: coupon } });

        if (userRedemptions >= coupon.usagePerUser)
            throw new Error("Coupon usage limit exceeded for this user");

        if (coupon.minPurchaseAmount && order.totalAmount < coupon.minPurchaseAmount)
            throw new Error(`Minimum order amount should be ${coupon.minPurchaseAmount}`);

        const getRestriction = await restrictionRepo.findOne({ where: { coupon: { id: couponId } } });

        if (getRestriction?.discountOn === discountOn.PRODUCT) {
            const product = await productRepo.findOne({ where: { id: discountOnId } });
            if (!product) throw new Error("Product not found for the given discountOnId");
        }

        if (getRestriction?.allowUserRoles === userType.NEW_USER) {
            if (user.createdAt < subDays(new Date(), 7)) throw new Error("This coupon is only for new users");
        }
        if (getRestriction?.allowUserRoles === userType.OLD_USER) {
            if (user.createdAt > subDays(new Date(), 7)) throw new Error("This coupon is only for old users");
        }

        return { valid: true, coupon, user, order };
    } catch (error: any) {
        return { valid: false, message: error.message };
    }
};
