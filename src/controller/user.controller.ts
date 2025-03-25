import { Request, Response } from "express";
import { createUser } from "../services/user.service";
import { StatusCodes } from "http-status-codes";


export const createUserController = async(req:Request, res:Response):Promise<void>=>{
    const {Name, Email, password} = req.body;
    try {
      const userAddedResult =  await  createUser(Name, Email, password);
       res.status(StatusCodes.OK).json({message : "user added successfully", data: userAddedResult})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: " internal server error"});
    }
}