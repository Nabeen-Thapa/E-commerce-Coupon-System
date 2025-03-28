import { Column, Entity, ManyToOne, Unique } from "typeorm";
import { commonModel } from "./common.modals";

@Entity("products")
export class Product extends commonModel {
    @Column()
    productName!: string;

    @Column({ nullable: false, default: 0 })
    price!: number;

    @Column({ default: true })
    isAvailable!: boolean; 
}