import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AuthDto {
    @ApiProperty({ example: 'test@example.com', description: 'User email'})
    @IsString()
    email: string;

    @ApiProperty({ example: 'secureString', description: 'User password'})
    @IsString()
    password: string;
}