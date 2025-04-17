import { Request, Response } from "express";
import { addToCart } from "../services/cart.service";
import { StatusCodes } from "http-status-codes";
import { Controller } from "../decorators/controller.decoder";
import { Route } from "../decorators/route.decoder";

@Controller("/product/cart") 
export class cartController {
    @Route("post", "/add")
    async addToCart(req: Request, res: Response): Promise<void> {
        try {
            const { userId, productId, quantity } = req.body;

            if (!userId || !productId || !quantity || quantity <= 0) {
                res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid request data" });
                return;
            }

            const addToCartResult = await addToCart(userId, productId, quantity);

            res.status(StatusCodes.OK).json({
                message: "Product added to cart",
                data: addToCartResult
            });
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        }
    };
};