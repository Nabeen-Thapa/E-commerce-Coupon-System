import express from "express";

import dotenv from "dotenv";
import { registerRoutes } from "./registerRoutes";
import { cartController } from "./controller/cart.controller";
import { CouponRestrictionController } from "./controller/couponRestrict.controller";
import { productController } from "./controller/product.controller";
import { redeemController } from "./controller/redeemCoupon.controller";
import { userController } from "./controller/user.controller";
import { CouponController } from "./controller/coupn.controller";
import { orderController } from "./controller/order.controller";

import swaggerUi from "swagger-ui-express";
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
import fs from "fs";
import path from "path";

const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, "./swagger/swagger.json"), "utf-8"));

app.use("/coupon-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


registerRoutes(app, [cartController, CouponController, CouponRestrictionController,orderController , productController, redeemController, userController]);

const port =process.env.PORT || 3400;
app.listen(port, ()=>{
    console.log(`server is running in ${port}`);
    console.log(`documentation is running in ${port}/coupon-docs`);
})

