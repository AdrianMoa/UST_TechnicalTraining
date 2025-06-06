import { PartialType } from "@nestjs/mapped-types";
import { CreateProjectDto } from "./create-project.dto";
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateProjectDto extends PartialType(CreateProjectDto)  {
    @IsString()
    @MaxLength(150)
    @IsNotEmpty()
    @ApiPropertyOptional({example: 'Project XYZ', description: 'Project name' })
    readonly name: string;

    @IsString()
    @MaxLength(2000)
    @MinLength(3)
    @IsNotEmpty()
    @ApiPropertyOptional({example: 'Project Description', description: 'Description related to the project' })
    readonly description: string;

    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional({example: '/path/image.jpg', description: 'URL Path for image' })
    readonly imageUrl: string;

    @IsDateString()
    @ApiPropertyOptional({example: '2025-06-06T01:39:52.317Z', description: 'String date' })
    readonly contractSignedOn: Date;

    @IsNumber()
    @ApiPropertyOptional({example: '123456', description: 'Budget for project' })
    readonly budget: number;

    @IsBoolean()
    @IsNotEmpty()
    @ApiPropertyOptional({example: 'true', description: 'Is Active?' })
    readonly isActive: boolean;

}