import { couponConnection } from "../dbconfig/dbConfig";
import { User } from "../models/User.model";
import { Product } from "../models/product.model";
import { Cart } from "../models/cart.model";
import { CartItem } from "../models/cartItem.model";

export const addToCart = async (userId: number, productId: number, quantity: number) => {
    try {

        const getUser = await couponConnection.getRepository(User).findOne({ where: { id: userId } });
        console.log("Fetched users:", getUser);
        const getProduct = await couponConnection.getRepository(Product).findOne({ where: { id: productId } });
        console.log("Fetched Product:", getProduct);


        if (!getUser || !getProduct) {
            throw new Error("User or Product not found");
        }

        // Check if the user already has a cart
        let getCart = await couponConnection.getRepository(Cart).findOne({
            where: { user: { id: userId } },
            relations: ["user", "items"]//performs explicit lazy loading using a JOIN query when you explicitly request those relations in your findOne query.
        });

        if (!getCart) {
            getCart = new Cart();
            getCart.user = getUser;
            getCart.items = [];
            getCart.totalAmount = 0;
            getCart.discountAmount = 0;
            getCart.finalAmount = 0;
        }
        // Explicitly define cartItem with a union type (cartItem | undefined)
        let cartItem: CartItem | undefined = getCart.items.find(item => item.product.id === productId);

        if (cartItem) {
            // If the product already exists in the cart, update quantity and total price
            cartItem.quantity += quantity;
            cartItem.totalPrice = cartItem.quantity * cartItem.price;
        } else {
            // **Ensure cartItem is properly initialized before use**
            cartItem = new CartItem();
            cartItem.cart = getCart;
            cartItem.product = getProduct;
            cartItem.quantity = quantity;
            cartItem.price = getProduct.price;
            cartItem.totalPrice = quantity * getProduct.price;

            // Push the new cartItem to the cart
            getCart.items.push(cartItem);
        }


        // Calculate total cart amounts
        getCart.totalAmount = getCart.items.reduce((sum, item) => sum + (item.totalPrice), 0);
        getCart.finalAmount = getCart.totalAmount - (getCart.discountAmount ?? 0);

        // Fixed references
        console.log("Total Amount before saving:", getCart.totalAmount);
        console.log("Final Amount before saving:", getCart.finalAmount);

        await couponConnection.transaction(async (manager) => {
            await manager.getRepository(CartItem).save(cartItem);
            await manager.getRepository(Cart).save(getCart);
        });

        return {
            message: "Product added to cart successfully",
            cart: getCart
        };
    } catch (error) {
        console.error(error);
        return Error("Internal Server Error");
    }
};
