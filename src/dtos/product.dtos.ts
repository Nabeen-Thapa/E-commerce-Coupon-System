import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ValidateProductData {
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