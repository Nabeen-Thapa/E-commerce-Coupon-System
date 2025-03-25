import { Column, Entity, OneToMany } from "typeorm";
import { commonModel } from "./common.modals";
import { Cart } from "./cart.model";

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
}