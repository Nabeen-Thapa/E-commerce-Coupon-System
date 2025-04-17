import { promises } from "dns";
import { Request, Response } from "express";
import { createOrder, getUserOrders } from "../services/order.service";
import { Controller } from "../decorators/controller.decoder";
import { Route } from "../decorators/route.decoder";

@Controller("/api/product")
export class orderController {
    @Route("POST", "/order/create")
   async createOrder(req:Request, res:Response):Promise<void>{
    try {
        const { userId} = req.body;
        const result = await createOrder(userId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error});
    }
}

   async viewOrder(req:Request, res:Response) {
    Route("GET", "/order/view/:id")
    try {
        const userId = Number(req.params.id);
        const orders = await getUserOrders(userId);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}
}