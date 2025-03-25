import { Column, ManyToOne } from "typeorm";
import { commonModel } from "./common.modals";
import { User } from "./User.model";
import { orderStatus } from "../types/orderStatus.type";

export class Order extends commonModel{
    @ManyToOne(()=>User, (user)=>user.orders)
    user!:User;

    @Column("decimal", { precision: 10, scale: 2 })
    totalAmount!: number;

    @Column({enum:orderStatus.PENDING}) 
    status!: orderStatus;
}