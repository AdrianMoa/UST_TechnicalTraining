import { IsString, IsEmail, MinLength, minLength } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({ example: 'Adrian Moa', description: 'User full name'})
    @IsString()
    name: string;

    @ApiProperty({ example: 'test@example.com', description: 'User email'})
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'secureString', description: 'User password'})
    @IsString()
    @MinLength(6)
    password: string;
}