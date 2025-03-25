import { promises } from "dns";
import { Request, Response } from "express";
import { createOrder, getUserOrders } from "../services/order.service";

export const createOrderController = async(req:Request, res:Response):Promise<void>=>{
    try {
        const { userId, totalAmount } = req.body;
        const result = await createOrder(userId, totalAmount);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error});
    }
}

export const viewOrder = async (req:Request, res:Response) => {
    try {
        const userId = Number(req.params.id);
        const orders = await getUserOrders(userId);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}