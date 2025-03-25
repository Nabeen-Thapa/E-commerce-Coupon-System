import { Column, Entity, ManyToOne } from "typeorm";
import { commonModel } from "./common.modals";
import { Cart } from "./cart.model";
import { Product } from "./product.model";

@Entity("cartItems")
export class CartItem extends commonModel{
    @ManyToOne(()=> Cart, (cart)=> cart.items)
    cart!: Cart;

    @ManyToOne(()=>Product)
    product!:Product;

    @Column({ default: 1 })
    quantity!: number;  

    @Column("decimal", {precision:10, scale:2})
    price!: number;

    @Column("decimal", { precision: 10, scale: 2 })
    totalPrice!: number;
}