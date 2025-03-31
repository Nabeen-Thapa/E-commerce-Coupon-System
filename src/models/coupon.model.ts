import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { commonModel } from "./common.modals";
import { DiscountType } from "../types/discount.type";
import { CouponRedemption } from "./CouponRedemption";


@Entity()
export class Coupon extends commonModel {
    @Column({ unique: true })
    code!: string;

    @Column({ type: "enum", enum: DiscountType })
    discountType!: DiscountType;

    @Column("decimal", { precision: 10, scale: 2 })
    discountValue!: number;

    @Column({ default: true })
    isActive!: boolean;

    @Column({ nullable: true })
    minPurchaseAmount!: number;

    @Column({ nullable: true })
    maxDiscountAmount!: number;

    @Column()
    validFrom!: Date;

    @Column()
    validUntil!: Date;

    @Column({ default: 1}) 
    usageLimit!: number; //how many used can how many times

    @Column({default: 0})
    totalRedeemption!: number; //trasks how many times coupn used

    @Column({ default: 1 })
    usagePerUser!: number;

    @OneToMany(() => CouponRedemption, (redemption) => redemption.coupon)
    redemptions!: CouponRedemption[];

}