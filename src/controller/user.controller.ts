import { Request, Response } from "express";
import { userServices } from "../services/user.service";
import { StatusCodes } from "http-status-codes";
import { Controller } from "../decorators/controller.decoder";
import { Route } from "../decorators/route.decoder";

@Controller("/user")
export class userController{
    @Route("post", "/add")

    private userService= new userServices();
 async createUser(req:Request, res:Response):Promise<void>{
    const {Name, Email, password} = req.body;
    try {
      const userAddedResult =  await  this.userService.createUser(Name, Email, password);
       res.status(StatusCodes.OK).json({message : "user added successfully", data: userAddedResult})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: " internal server error"});
    }
}
}