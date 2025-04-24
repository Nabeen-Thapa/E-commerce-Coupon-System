import { NextFunction, Request, Response } from "express";
import { cartServices } from "../services/cart.service";
import { StatusCodes } from "http-status-codes";
import { Controller } from "../decorators/controller.decoder";
import { Route } from "../decorators/route.decoder";
import { UseMiddleware } from "../decorators/middleware.decoder";

function logMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log(`[LOG] ${req.method} ${req.path}`);
    next();
  }
  
@Controller("/product/cart") 
export class cartController {
    @Route("post", "/add")
    @UseMiddleware(logMiddleware)
    async addToCart(req: Request, res: Response): Promise<void> {
        try {
            const { userId, productId, quantity } = req.body;

            if (!userId || !productId || !quantity || quantity <= 0) {
                res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid request data" });
                return;
            }
            const addTOcartService = new cartServices();
            const addToCartResult = await addTOcartService.addToCart(userId, productId, quantity);

            res.status(StatusCodes.OK).json({message: "product added successfully form controller",
                data:addToCartResult
            });
           return;
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        }
    };
};