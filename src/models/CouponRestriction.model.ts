import { Column, Entity, ManyToOne } from "typeorm";
import { commonModel } from "./common.modals";
import { Coupon } from "./coupon.model";
import { userType } from "../types/userTypes.type";

@Entity("copuonRestriction")
export class CouponRestriction extends commonModel {
  @ManyToOne(() => Coupon)
  coupon!: Coupon;

  @Column({type: "enum", enum:userType, default:userType.NORMAL_USER})
  allowUserRoles!: userType; //new user, old users , premimun

  @Column({ nullable: true })
  allowPaymentMethods!: string; 

  @Column({ nullable: true })
  excludedProductId!: string;

  @Column({ nullable: true })
  excludedCategoryIds!: string;
}