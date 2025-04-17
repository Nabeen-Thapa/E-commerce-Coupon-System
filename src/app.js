"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
//app.use("/api",couponRoutes);
//registerRoutes(app, [cartController, CouponController, CouponRestrictionController, orderController, productController, redeemController, userController])
var port = process.env.PORT || 3400;
app.listen(port, function () {
    console.log("server is running in ".concat(port));
});
