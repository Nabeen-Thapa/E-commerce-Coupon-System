import { couponConnection } from "../dbconfig/dbConfig"
import { Coupon } from "../models/coupon.model";
import { CouponRedemption } from "../models/CouponRedemption";
import { User } from "../models/User.model"


export const RedeemCoupon = async (userId: number, couponId: number, orderId: number, discountApplied: number) => {
    try {

        const getUser = await couponConnection.getRepository(User).findOne({ where: { id: userId } });
        console.log("user id in redeem service: ", getUser);

        const getCoupon = await couponConnection.getRepository(Coupon).findOne({ where: { id: couponId } });

        if (!getUser || !getCoupon) {
            throw new Error("user ot coupon not fond");
        }
        const newRedemption = new CouponRedemption();
        newRedemption.user = getUser;
        newRedemption.coupon = getCoupon;
        newRedemption.orderId = orderId;
        newRedemption.discountApplied = discountApplied;
        await couponConnection.getRepository(CouponRedemption).save(newRedemption);

        return {
            message: "coupon redeemed successfullt",
            redeemption: newRedemption
        }
    } catch (error) {
        console.log("error during redeem coupon:", error)
    }
}
