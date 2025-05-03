import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { productServiecs } from "../services/product.services";
import { Controller } from "../decorators/controller.decoder";
import { Route } from "../decorators/route.decoder";
import { Body, Req, Res } from "../decorators/params/parameter.decorator";
import { ProductDto } from "../dtos/product.dtos";
import { sendError, sendSuccess } from "../utils/response.utils";

@Controller("/api/product")
export class productController {
  private productService = new productServiecs();

  @Route("post", "/add")
  async addProduct(@Body() productData : ProductDto, @Req() req: Request, @Res() res: Response): Promise<void> {
    const { productName, price, isAvailable } = productData;
    try {
      const addProductResult = await this.productService.addProduct(productName,price,isAvailable);

      sendSuccess(res, StatusCodes.CREATED, "Product added successfully",addProductResult)
    } catch (error: any) {
      console.error("error in add product controller:", error.message);
      sendError(res, StatusCodes.BAD_REQUEST, error)
    }
  }
}
