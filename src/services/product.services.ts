import { couponConnection } from "../dbconfig/dbConfig";
import { Product } from "../models/product.model";

export class productServiecs {
 async addProduct(productName:string, price:number, isAvailable:boolean){
    if(!productName || !price || !isAvailable){
     throw new Error("all fields are needed");
    }
    try {
        const getProductRepo = couponConnection.getRepository(Product);
        // const isProductNameExist = await getProductRepo.find({where: {productName}});
        // if(isProductNameExist){
        //     throw new Error("product with this us already exist")
        // }
        const newProduct = getProductRepo.create({
            productName, 
            price,
           isAvailable
        });
        await getProductRepo.save(newProduct);
        return newProduct;
    } catch (error) {
        console.log("error in add product:",error)
    }
}
}
