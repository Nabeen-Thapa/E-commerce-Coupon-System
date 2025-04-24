import express from "express";

import dotenv from "dotenv";
import { registerRoutes } from "./registerRoutes";
import { cartController } from "./controller/cart.controller";
import { CouponController } from "./controller/coupn.controller";
import { CouponRestrictionController } from "./controller/couponRestrict.controller";
import { orderController } from "./controller/order.controller";
import { productController } from "./controller/product.controller";
import { redeemController } from "./controller/redeemCoupon.controller";
import { userController } from "./controller/user.controller";
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

registerRoutes(app, [cartController, CouponController, CouponRestrictionController, orderController, productController, redeemController, userController]);

const port =process.env.PORT || 3400;
app.listen(port, ()=>{
    console.log(`server is running in ${port}`);
})

