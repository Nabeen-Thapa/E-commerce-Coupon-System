import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { commonModel } from "./common.modals";
import { CartItem } from "./cartItem.model";
import { User } from "./User.model";

@Entity("cart")
export class Cart extends commonModel {

    @ManyToOne(() => User, (user) => user.carts) 
    user!: User;
    
    @OneToMany(()=> CartItem, (cartItem)=>cartItem.cart, {cascade:true})
    items!:CartItem[];

    @Column("decimal", { precision: 10, scale: 2, default: 0 })
    totalAmount!: number;

    @Column("decimal", { precision: 10, scale: 2, default: 0 })
    finalAmount!: number;
}