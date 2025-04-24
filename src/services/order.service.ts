import { isErrored } from "stream";
import { couponConnection } from "../dbconfig/dbConfig"
import { Order } from "../models/order.model"
import { User } from "../models/User.model";
import { Cart } from "../models/cart.model";

//convert this to class
export class orderServices{
async createOrder(userId: number){
    try {
        const orderRepo = couponConnection.getRepository(Order);
        const userRepo = couponConnection.getRepository(User);
        const cartRepo = couponConnection.getRepository(Cart);
        const isUserExist = await userRepo.findOne({where :{id: userId}});
        if(!isUserExist){
            throw new Error("user is not exist");
        } 
        const getCartTotalAmount =  await cartRepo.findOne({where: {user: {id: userId}}})
        const totalAmount = getCartTotalAmount?.totalAmount;
        const newOrder = orderRepo.create({user: isUserExist, totalAmount });
        await orderRepo.save(newOrder);
        return { message: "Order created successfully", order: newOrder };
    } catch (error) {
        console.error("Error creating order:", error);
        throw new Error("Internal Server Error");
    }
}

async getUserOrders(userId: number){
    try {
        const orderRepo = couponConnection.getRepository(Order);
        const orders = await orderRepo.find({ where: { user: { id: userId } }, order: { createdAt: "DESC" } });

        return orders.length ? orders : "No orders found";
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw new Error("Internal Server Error");
    }
}
};