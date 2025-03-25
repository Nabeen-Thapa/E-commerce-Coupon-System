import express, { Router } from "express";
import { addProductController } from "../controller/product.controller";
import { addToCartController } from "../controller/cart.controller";
import { createUserController } from "../controller/user.controller";

const couponRoutes:Router =  express.Router();

couponRoutes.post("/product/add", addProductController);
couponRoutes.post("/product/cart/add", addToCartController);

//for user
couponRoutes.post("/user/add", createUserController);


export default couponRoutes;