import { IsString } from "@nestjs/class-validator";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    password: string;

    refreshToken?: string | null;
}