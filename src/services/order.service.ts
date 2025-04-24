
import { couponConnection } from "../dbconfig/dbConfig"
import { Order } from "../models/order.model"
import { User } from "../models/User.model";
import { Cart } from "../models/cart.model";

//convert this to class
export class orderServices{

    private orderRepo = couponConnection.getRepository(Order);
    private userRepo = couponConnection.getRepository(User);
    private cartRepo = couponConnection.getRepository(Cart);

async createOrder(userId: number){
    try {
       
        const isUserExist = await this.userRepo.findOne({where :{id: userId}});
        if(!isUserExist) throw new Error("user is not exist");
        
        const cart =  await this.cartRepo.findOne({where: {user: {id: userId}}})
        if (!cart || !cart.totalAmount) throw new Error("Cart not found or total amount missing");
        
        const newOrder = this.orderRepo.create({user: isUserExist, totalAmount :cart.totalAmount });
        await this.orderRepo.save(newOrder);

        return { 
            message: "Order created successfully",
             order: newOrder 
            };
    } catch (error) {
        console.error("Error creating order:", error);
        throw new Error("Internal Server Error");
    }
}

async getUserOrders(userId: number){
    try {
        const orders = await this.orderRepo.find({ where: { user: { id: userId } }, order: { createdAt: "DESC" } });

        return orders.length ? orders : "No orders found";
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw new Error("Internal Server Error");
    }
}
};