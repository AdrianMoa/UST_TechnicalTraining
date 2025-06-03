import { IsBoolean, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "@nestjs/class-validator";

export class CreateProjectDto {
    @IsString()
    @MaxLength(150)
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @MaxLength(2000)
    @MinLength(3)
    @IsNotEmpty()
    readonly description: string;

    @IsString()
    @IsNotEmpty()
    readonly imageUrl: string;

    @IsNumber()
    readonly contractTypeId: number | undefined;

    @IsString()
    readonly contractSignedOn: Date;

    @IsNumber()
    readonly budget: number;

    @IsBoolean()
    @IsNotEmpty()
    readonly isActive: boolean;
}