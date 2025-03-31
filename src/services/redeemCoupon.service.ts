import { subDays } from "date-fns";
import { couponConnection } from "../dbconfig/dbConfig";
import { Coupon } from "../models/coupon.model";
import { CouponRedemption } from "../models/CouponRedemption";
import { CouponRestriction } from "../models/CouponRestriction.model";
import { User } from "../models/User.model";
import { Order } from "../models/order.model";
import { Product } from "../models/product.model";
import { Cart } from "../models/cart.model";
import { userType } from "../types/userTypes.type";
import { DiscountType } from "../types/discount.type";

export const RedeemCoupon = async (userId: number, couponId: number, orderId: number, discountOnId: number) => {
    try {
        const userRepo = couponConnection.getRepository(User);
        const couponRepo = couponConnection.getRepository(Coupon);
        const redemptionRepo = couponConnection.getRepository(CouponRedemption);
        const restrictionRepo = couponConnection.getRepository(CouponRestriction);
        const orderRepo = couponConnection.getRepository(Order);
        const productRepo = couponConnection.getRepository(Product);
        const cartRepo = couponConnection.getRepository(Cart);
        //const categoryRepo = couponConnection.getRepository(Category);

        const getOrder = await orderRepo.findOne({ where: { id: orderId } })
        const getUser = await userRepo.findOne({ where: { id: userId } });
        const getCoupon = await couponRepo.findOne({ where: { id: couponId } });

        if (!getOrder) throw new Error("order not fuond");
        if (!getUser || !getCoupon) throw new Error("User or Coupon not found");
        if (!restrictionRepo)  throw new Error("coupon redemption not found");
        

        //check the coupon is for what for prescific product, or category or for all
        const getRestriction = await restrictionRepo.findOne({ where: { coupon: { id: couponId } } });
        let getDiscoutOnId = 0;
        if (getRestriction?.discountOn === "product") {
            const product = await productRepo.findOne({ where: { id: discountOnId } });
            if (!product)  throw new Error("Product not found for the given discountOnId");
            
            getDiscoutOnId = product.id;
            if (!getDiscoutOnId)   throw new Error("the coupon discount is not for this porduct");
            
        }
        // let getDiscoutOnId = (getRestriction?.discountOn === "product") ? ((await productRepo.findOne({ where: { id: discountOnId } }))) :" ";


        //if category exist (corrnetly category is not exist in my project)
        // if (restrictionRepo?.discountOn === "category") {
        //     const category = await category.findOne({ where: { id: discountOnId } })
        //     if (!category) {
        //         throw new Error("category not found for the given discountOnId");
        //     }
        //     getDiscoutOnId = category.id;
        //     if (!getDiscoutOnId) {
        //         throw new Error("the coupon discount is not for this porduct");
        //     }
        // }


        //ckeck which user type is allow to use coupon (check by user registerd/created date)
        const getRestrictionUserType = await restrictionRepo.findOne({ where: { coupon: { id: couponId } } })
        if (getRestrictionUserType?.allowUserRoles === userType.NEW_USER) {
            const sevenDaysAgo = subDays(new Date(), 7);
            if (getUser?.createdAt < sevenDaysAgo)  throw new Error("this coupon is only for new users");
        }
        if (getRestrictionUserType?.allowUserRoles === userType.OLD_USER) {
            const sevenDaysAgo = subDays(new Date(), 7);
            if (getUser?.createdAt > sevenDaysAgo)  throw new Error("this coupon is only for old users");
            
        }

        //  Check if the coupon is active and within the valid date range
        const now = new Date();
        if (!getCoupon.isActive || now < getCoupon.validFrom || now > getCoupon.validUntil)
            throw new Error("Coupon is expired or inactive");
        

        //Check if the user has already redeemed the coupon max times
        const userRedemptions = await redemptionRepo.count({ where: { user: getUser, coupon: getCoupon } });

        if (userRedemptions >= getCoupon.usagePerUser) throw new Error("Coupon usage limit exceeded for this user");
        
        if (getCoupon.totalRedeemption >= getCoupon.usageLimit) throw new Error("This coupon has reached its maximum redemption limit");
        
        let orderAmount = getOrder?.totalAmount;
        //Check if the order amount meets the minimum purchase requirement
        if (getCoupon.minPurchaseAmount && orderAmount < getCoupon.minPurchaseAmount) 
            throw new Error(`Minimum order amount should be ${getCoupon.minPurchaseAmount}`);
        

        //Calculate Discount
        let discountApplied = 0;
        if (getCoupon.discountType === DiscountType.PERCENTAGE) {
            discountApplied = (orderAmount * getCoupon.discountValue) / 100;
            if (getCoupon.maxDiscountAmount) {
                discountApplied = Math.min(discountApplied, getCoupon.maxDiscountAmount);
            }
        } else if (getCoupon.discountType === DiscountType.FIXED) {
            discountApplied = Math.round(getCoupon.discountValue);
        }

        //Save Coupon Redemption Entry
        const newRedemption = redemptionRepo.create({
            user: getUser,
            coupon: getCoupon,
            orderId,
            discountApplied
        });
        await redemptionRepo.save(newRedemption);

        //reduce the total final anount by discount appiled amount
        const getorderedAmount = await orderRepo.findOne({
            where: { id: orderId } 
        });
        
        if (!getorderedAmount) throw new Error("Order not found for the given userId");
        
        
        // Convert decimal to number
        let getOrderFinalAmount = Math.round(Number(getorderedAmount.totalAmount ?? 0));
        console.log("get order amount:", getOrderFinalAmount);
        
        const newOrderFinalAmount = Math.round(getOrderFinalAmount - discountApplied);
        await orderRepo.update(
            { id: orderId },
            { totalAmount: newOrderFinalAmount }
        );
        
        //Increase Coupon Redemption Count
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
