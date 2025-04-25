import { plainToInstance } from "class-transformer";
import { couponConnection } from "../dbconfig/dbConfig";
import { Product } from "../models/product.model";
import { ValidateProductData } from "../dtos/product.dtos";
import { validate } from "class-validator";

export class productServiecs {
    async addProduct(productName: string, price: number, isAvailable: boolean) {

        try {
            const productData = plainToInstance(ValidateProductData, { productName, price, isAvailable })
            const errors = await validate(productData);
            if (errors.length > 0) {
                const message = errors.map(err => Object.values(err.constraints || {}).join(", ")).join("; ");
                throw new Error(`Validation failed: ${message}`);
            }

            const getProductRepo = couponConnection.getRepository(Product);
            const product = await getProductRepo.find({ where: { productName } });
            if (product.length > 0) throw new Error("product with this us already exist");

            const newProduct = getProductRepo.create({
                productName,
                price,
                isAvailable
            });
            await getProductRepo.save(newProduct);
            return newProduct;
        } catch (error) {
            console.log("error in add product:", error);
            throw error;
        }
    }
}
