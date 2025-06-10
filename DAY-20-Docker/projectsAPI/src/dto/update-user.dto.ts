import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @ApiPropertyOptional({ example: 'Adrian Updated', description: 'New user name'})
    name?: string;

    @ApiPropertyOptional({ example: 'new@email.com', description: 'New user email'})
    email?: string | undefined;

    @ApiPropertyOptional({ example: 'secretUpdated', description: "New user password"})
    password?: string | undefined;

    refreshToken?: string | null;
}