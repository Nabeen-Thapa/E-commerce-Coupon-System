import { couponConnection } from "../dbconfig/dbConfig";
import { Coupon } from "../models/coupon.model";
import { CouponRedemption } from "../models/CouponRedemption";
import { Order } from "../models/order.model";
import { DiscountType } from "../types/discount.type";
import { couponValidation } from "../event/couponValidate.subscribe";

export class redeemedServices{
async RedeemCoupon(userId: number, couponId: number, orderId: number, discountOnId: number) {
    const queryRunner = couponConnection.createQueryRunner();
    queryRunner.connect();
    queryRunner.startTransaction();

    try {
        const validationResult = await couponValidation(userId, couponId, orderId, discountOnId);
        if (!validationResult.valid) throw new Error(validationResult.message);

        const { coupon, user, order } = validationResult;
        const redemptionRepo = queryRunner.manager.getRepository(CouponRedemption);
        const orderRepo = queryRunner.manager.getRepository(Order);
        const couponRepo = queryRunner.manager.getRepository(Coupon);

        if (!order) throw new Error("Order not found");
        if (!user) throw new Error("User n not found");
        if (!coupon) throw new Error(" Coupon not found");

        let discountApplied = 0;
        if (coupon.discountType === DiscountType.PERCENTAGE) {
            discountApplied = (order.totalAmount * coupon.discountValue) / 100;
            if (coupon.maxDiscountAmount) {
                discountApplied = Math.min(discountApplied, coupon.maxDiscountAmount);
            }
        } else if (coupon.discountType === DiscountType.FIXED) {
            discountApplied = Math.round(coupon.discountValue);
        }

        const newRedemption = redemptionRepo.create({
            user,
            coupon,
            orderId,
            discountApplied
        });
        // Using Math.max(0, ...) ensures that if the calculated amount is negative, it will set the total to 0 instead of allowing a negative value
        const newOrderFinalAmount = Math.max(0, Math.round(order.totalAmount - discountApplied));
        await orderRepo.update({ id: orderId }, { totalAmount: newOrderFinalAmount });

        coupon.totalRedeemption += 1;

        await redemptionRepo.save(newRedemption);
        await couponRepo.save(coupon);
        await queryRunner.commitTransaction();
        return {
            message: "Coupon redeemed successfully",
            discountApplied,
            redemption: newRedemption
        };
    } catch (error) {
        console.error("Error during coupon redemption:", error);

        // Rollback the transaction if any operation fails
        await queryRunner.rollbackTransaction();
        throw new Error("Coupon redemption failed");
    } finally {
        // Release the query runner
        await queryRunner.release();
    }
}
};
