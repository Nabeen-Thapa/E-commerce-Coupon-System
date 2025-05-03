import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ProductDto {
    @IsString()
    @IsNotEmpty()
    productName!: string;

    @IsNumber()
    @IsNotEmpty()
    price!: number;

    @IsBoolean()
    @IsNotEmpty()
    isAvailable!: boolean;
}