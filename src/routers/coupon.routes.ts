import express, { Router } from "express";
import { addProductController } from "../controller/product.controller";
import { addToCartController } from "../controller/cart.controller";
import { createUserController } from "../controller/user.controller";
import { addCouponController, generateCouponController } from "../controller/coupn.controller";

const couponRoutes:Router =  express.Router();
//for porduct
couponRoutes.post("/product/add", addProductController);
couponRoutes.post("/product/cart/add", addToCartController);

//for user
couponRoutes.post("/user/add", createUserController);

//for generate uinque coupon code
couponRoutes.get("/product/coupon/code", generateCouponController);

//add coupon
couponRoutes.get("/product/coupon", addCouponController);
export default couponRoutes;
