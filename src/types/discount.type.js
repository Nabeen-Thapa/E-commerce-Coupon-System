"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.discountOn = exports.DiscountType = void 0;
var DiscountType;
(function (DiscountType) {
    DiscountType["PERCENTAGE"] = "percentage";
    DiscountType["FIXED"] = "fixed";
})(DiscountType || (exports.DiscountType = DiscountType = {}));
var discountOn;
(function (discountOn) {
    discountOn["PRODUCT"] = "product";
    discountOn["CATEGORY"] = "category";
    discountOn["ALL"] = "all";
})(discountOn || (exports.discountOn = discountOn = {}));
