import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { addProduct } from "../services/product.services";


export const addProductController = async(req:Request, res:Response)=>{
    const{productName, price, isAvailable}= req.body;
    if(!productName || !price || !isAvailable){
        res.status(StatusCodes.BAD_REQUEST).json({message:"all field required"})
    }
    try {
        const addProductResult = await addProduct(productName, price, isAvailable);
        res.status(StatusCodes.OK).json({message: "product added successfully"});
    } catch (error) {
        console.log("error in add product controller:", error)
    }
}