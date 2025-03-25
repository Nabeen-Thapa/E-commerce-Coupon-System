import { Column, ManyToOne } from "typeorm";
import { commonModel } from "./common.modals";
import { Coupon } from "./coupon.model";

export class CouponRestriction extends commonModel{
  @ManyToOne(()=> Coupon)
  coupon!:Coupon;

    @Column({nullable :true})
    allowUserRoles!: string; //new user, old users , premimun

    @Column({nullable: true})
    allowPymentMethods!: string; //cards type

    @Column({nullable:true})
    excludedProductId! : string;

    @Column({ nullable: true })
  excludedCategoryIds!: string; 
}