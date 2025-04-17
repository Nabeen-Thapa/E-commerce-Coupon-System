import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { addProduct } from "../services/product.services";
import { Controller } from "../decorators/controller.decoder";
import { Route } from "../decorators/route.decoder";

@Controller("/api/product")
export class productController {
    @Route("post", "/add")
 async addProduct(req:Request, res:Response){
    const{productName, price, isAvailable}= req.body;
    if(!productName || !price || !isAvailable){
      res.status(StatusCodes.BAD_REQUEST).json({message:"all field required"});
      return ;
    }
    try {
        const addProductResult = await addProduct(productName, price, isAvailable);
        res.status(StatusCodes.OK).json({message: "product added successfully form controller",
            data:addProductResult
        });
        return;
    } catch (error) {
        console.log("error in add product controller:", error)
    }
}
}