import express, { Router } from "express";
import { addProductController } from "../controller/product.controller";

const productRoutes:Router =  express.Router();

productRoutes.post("/product/add", addProductController);

export default productRoutes;