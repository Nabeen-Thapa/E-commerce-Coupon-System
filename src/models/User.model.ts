import { Column, Entity, OneToMany } from "typeorm";
import { commonModel } from "./common.modals";
import { Cart } from "./cart.model";
import { Order } from "./order.model";

@Entity("Users")
export class User extends commonModel{
    @Column()
    Name!: string;

    @Column()
    Email!:string;

    @Column()
    password!: string;

    @OneToMany(() => Cart, (cart) => cart.user) 
    carts!: Cart[];

    @OneToMany(()=> Order, (order)=>order.user)
    orders!: Order[];
}