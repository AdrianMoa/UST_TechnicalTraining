import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AccessTokenGuard } from "src/common/guards/guard.access_token";
import { CreateUserDto } from "src/dto/create-user.dto";
import { UpdateUserDto } from "src/dto/update-user.dto";
import { User } from "src/schema/user.schema";
import { UsersService } from "src/service/user/users.service";

//@UseGuards(AccessTokenGuard)
@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        let test = this.usersService.create(createUserDto);
        console.log(test);
        return test;
    }

    @Get()
    async findAll(): Promise<User[]> {
        return (await this.usersService.findAll()).map((user) => new User(user));
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.usersService.findById(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
}