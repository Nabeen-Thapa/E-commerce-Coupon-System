import { Column, Entity, ManyToOne } from "typeorm";
import { commonModel } from "./common.modals";
import { Coupon } from "./coupon.model";
import { User } from "./User.model";

@Entity()
export class CouponRedemption extends commonModel{
    @ManyToOne(()=> Coupon, (coupon)=> coupon.redemptions)
    coupon!: Coupon;
    
    @Column()
    orderId!: number;

    @ManyToOne(()=>User)
    user!: User;

    @Column("decimal", { precision: 10, scale: 2 })
    discountApplied!: number;  

}