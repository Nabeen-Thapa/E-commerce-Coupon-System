import { promises } from "dns";
import { Request, Response } from "express";
import { Controller } from "../decorators/controller.decoder";
import { Route } from "../decorators/route.decoder";
import { orderServices } from "../services/order.service";

@Controller("/api/product")
export class orderController {
    @Route("post", "/order/create")
  private  orderService = new orderServices();
    async createOrder(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.body;
            const result = await this.orderService.createOrder(userId);
            res.json(result);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    async viewOrder(req: Request, res: Response) {
        Route("GET", "/order/view/:id")
        try {
            const userId = Number(req.params.id);
            const orders = await this.orderService.getUserOrders(userId);
            res.json(orders);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
}