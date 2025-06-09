import { IsNumber, IsString } from "@nestjs/class-validator";

export class CreateProductoDto {
    @IsNumber()
    id: number;

    @IsString()
    name: string;
}