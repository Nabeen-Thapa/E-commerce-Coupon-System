import { couponConnection } from "../dbconfig/dbConfig";
import { product } from "../models/product.model";

export const addProduct =async(productName:string, price:number, isAvailable:boolean)=>{
    if(!productName || !price || ! isAvailable){
     throw new Error("all fields are needed");
    }
    try {
        const getProductRepo = couponConnection.getRepository(product);
        const isProductNameExist = await getProductRepo.find({where: {productName}});
        if(isProductNameExist){
            throw new Error("product with this us already exist")
        }
        const newProduct = getProductRepo.create({
            productName: productName.trim(), 
            price,
           isAvailable
        });
        await getProductRepo.save(newProduct);
    } catch (error) {
        console.log("error in add product:",error)
    }
}
