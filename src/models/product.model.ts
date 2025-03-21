import { Column, Entity, Unique } from "typeorm";
import { commonModel } from "./common.modals";

@Entity("products")
@Unique(["id"])

export class product extends commonModel{
    @Column() 
    productName!:string;

    @Column({nullable: false, default: 0 })
    price!: number;

    @Column({nullable: true, default: 0 })
    discount?:number;

    @Column({nullable: true })
    discountCoupon?:number;
    
    @Column({nullable: false, default: 0 })
    sellingPrice!: number;

    @Column()
    productDescription!:string;    
}
