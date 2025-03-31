import { couponConnection } from "../dbconfig/dbConfig";
import { Coupon } from "../models/coupon.model";
import { DiscountType } from "../types/discount.type";

export const addCoupon = async ( code:string, 
    discountType :DiscountType, 
    discountValue :number, 
    isActive = true, 
    minPurchaseAmount :number, 
    maxDiscountAmount:number, 
    validFrom :Date, 
    validUntil :Date, 
    usageLimit :number, 
    usagePerUser :number )=>{
      try {
        const couponRepo = couponConnection.getRepository(Coupon);
        const isExistSameCode = await couponRepo.findOne({where:{code}});
        if(isExistSameCode) throw new Error("provided coupon is already exist");
        
        const newCoupon = couponRepo.create({
            code,
            discountType: discountType as DiscountType,
            discountValue,
            isActive,
            minPurchaseAmount: minPurchaseAmount || null,
            maxDiscountAmount: maxDiscountAmount || null,
            validFrom,
            validUntil,
            usageLimit,
            usagePerUser
        } as Partial<Coupon>);

        await couponRepo.save(newCoupon);
        return { message: "Coupon added successfully", coupon: newCoupon };
      } catch (error) {
        console.log("add coupon service error:", error);
        return error;
      }

    
}