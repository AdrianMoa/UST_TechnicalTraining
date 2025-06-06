import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProjectDto {
    @IsString()
    @MaxLength(150)
    @IsNotEmpty()
    @ApiProperty({example: 'Project XYZ', description: 'Project name' })
    readonly name: string;

    @IsString()
    @MaxLength(2000)
    @MinLength(3)
    @IsNotEmpty()
    @ApiProperty({example: 'Project Description', description: 'Description related to the project' })
    readonly description: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: '/path/image.jpg', description: 'URL Path for image' })
    readonly imageUrl: string;

    @IsDateString()
    @ApiProperty({example: '2025-06-06T01:39:52.317Z', description: 'String date' })
    readonly contractSignedOn: Date;

    @IsNumber()
    @ApiProperty({example: '123456', description: 'Budget for project' })
    readonly budget: number;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({example: 'true', description: 'Is Active?' })
    readonly isActive: boolean;
}