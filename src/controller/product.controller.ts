import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { productServiecs } from "../services/product.services";
import { Controller } from "../decorators/controller.decoder";
import { Route } from "../decorators/route.decoder";

@Controller("/api/product")
export class productController {
  private productService = new productServiecs();

  @Route("post", "/add")
  async addProduct(req: Request, res: Response): Promise<void> {
    const { productName, price, isAvailable } = req.body;

    try {
      const addProductResult = await this.productService.addProduct(
        productName,
        price,
        isAvailable
      );

      res.status(StatusCodes.CREATED).json({
        message: "Product added successfully",
        data: addProductResult,
      });
    } catch (error: any) {
      console.error("error in add product controller:", error.message);

      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message || "An unexpected error occurred",
      });
    }
  }
}
