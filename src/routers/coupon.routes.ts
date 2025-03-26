import express, { Router } from "express";
import { addProductController } from "../controller/product.controller";
import { addToCartController } from "../controller/cart.controller";
import { createUserController } from "../controller/user.controller";
import { addCouponController, generateCouponController } from "../controller/coupn.controller";
import { createOrderController, viewOrder } from "../controller/order.controller";
import { RedeemCouponController } from "../controller/redeemCoupon.controller";

const couponRoutes:Router =  express.Router();
//for porduct
couponRoutes.post("/product/add", addProductController);
couponRoutes.post("/product/cart/add", addToCartController);
couponRoutes.post("/user/add", createUserController);
couponRoutes.get("/product/coupon/code", generateCouponController);
couponRoutes.get("/product/coupon", addCouponController);
couponRoutes.post("/product/order/create", createOrderController);
couponRoutes.get("/product/order/view/:id", viewOrder);
couponRoutes.post("/product/order/redemCoupon", RedeemCouponController);
export default couponRoutes;
