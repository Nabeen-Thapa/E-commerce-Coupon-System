import { Column, Entity, ManyToOne } from "typeorm";
import { commonModel } from "./common.modals";
import { User } from "./User.model";
import { orderStatus } from "../types/orderStatus.type";

@Entity("Orders")
export class Order extends commonModel{
    @ManyToOne(()=>User, (user)=>user.orders)
    user!:User;

    @Column("decimal", { precision: 10, scale: 2 })
    totalAmount!: number;

    @Column({type: "enum", enum:orderStatus, default:orderStatus.PENDING}) 
    status!: orderStatus;
}