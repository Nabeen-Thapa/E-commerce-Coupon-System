import { couponConnection } from "../dbconfig/dbConfig";
import { User } from "../models/User.model";

export class userServices{
async createUser(Name: string, Email: string, password: string)  {
    try {
        const userRepository = couponConnection.getRepository(User);
        
        // Check if user already exists
        const isUserExist = await userRepository.find({ where: { Email } });
        if (isUserExist.length > 0) throw new Error("User already exists");
        
        // Create a new user instance
        const newUser = userRepository.create({
            Name,
            Email,
            password,
        });

        // Save the user to the database
        const savedUser = await userRepository.save(newUser);

        console.log("User created successfully:", savedUser);

        return {
            message: "added",
            data: savedUser,
        };
    } catch (error) {
        console.error("Error creating user:", error);
        throw error; // Rethrow the error to be caught in the controller
    }
}
};
