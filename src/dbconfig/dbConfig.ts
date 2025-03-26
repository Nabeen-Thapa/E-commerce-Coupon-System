import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Product } from "../models/product.model";
import { Cart } from "../models/cart.model";
import { User } from "../models/User.model";
import { CartItem } from "../models/cartItem.model";
import { Coupon } from "../models/coupon.model";
import { CouponRedemption } from "../models/CouponRedemption";
import { CouponRestriction } from "../models/CouponRestriction.model";
import { Order } from "../models/order.model";
dotenv.config();
export const couponConnection = new DataSource({
    type:"postgres",
    host : process.env.HOST ||"localhost",
    port: 5432,
    username :"postgres",
    password : process.env.password ||"Nt@post",
    database : process.env.database || "CouponSystem",
    synchronize: true,
    logging: false,
    entities : [Product, Cart, User, CartItem, Coupon, CouponRedemption, CouponRestriction, Order],
})


couponConnection.initialize()
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((error) => {
    console.log("Error during Data Source initialization:", error);
  });

