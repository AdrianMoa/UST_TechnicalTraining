import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProjectDto {
    @IsString()
    @MaxLength(150)
    @IsNotEmpty()
    @ApiProperty()
    readonly name: string;

    @IsString()
    @MaxLength(2000)
    @MinLength(3)
    @IsNotEmpty()
    @ApiProperty()
    readonly description: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly imageUrl: string;

    @IsDateString()
    @ApiProperty()
    readonly contractSignedOn: Date;

    @IsNumber()
    @ApiProperty()
    readonly budget: number;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty()
    readonly isActive: boolean;
}