import { IsNotEmpty, IsString } from "@nestjs/class-validator";

export class CreateProductoDto {
    @IsNotEmpty()
    @IsString()
    name: string;
}