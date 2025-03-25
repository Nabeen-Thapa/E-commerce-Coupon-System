import { Request, Response } from "express";
import { addToCart } from "../services/cart.service";
import { StatusCodes } from "http-status-codes";

export const addToCartController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || !quantity || quantity <= 0) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid request data" });
            return;
        }

        await addToCart(userId, productId, quantity);

        res.status(StatusCodes.OK).json({ message: "Product added to cart" });
        return;
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Something went wrong" });
    }
};
