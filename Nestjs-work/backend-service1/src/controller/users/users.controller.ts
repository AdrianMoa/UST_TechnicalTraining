import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AccessTokenGuard } from "src/common/guards/guard.access_token";
import { CreateUserDto } from "src/dto/create-user.dto";
import { ResponseUserDto } from "src/dto/response-user.dto";
import { UpdateUserDto } from "src/dto/update-user.dto";
import { User } from "src/schema/user.schema";
import { UsersService } from "src/service/user/users.service";

//@UseGuards(AccessTokenGuard)
@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'User created', type: ResponseUserDto })
    @ApiBadRequestResponse({ description: 'Invalid parameters' })
    async create(@Body() createUserDto: CreateUserDto): Promise<ResponseUserDto> {
        try{
            const user = await this.usersService.create(createUserDto);
            return new ResponseUserDto(user);
        } catch (error) {
            throw new HttpException('Error creating the new user', HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    @ApiOperation({ summary: 'Get all users'})
    @ApiResponse({ status: 200, description: 'Users list', type: [ ResponseUserDto]})
    async findAll(): Promise<ResponseUserDto[]> {
        const users = await this.usersService.findAll();
        return users.map(user => new ResponseUserDto(user));
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get an user by ID'})
    @ApiResponse({ status: 200, description: 'User found', type: ResponseUserDto })
    @ApiNotFoundResponse({ description: 'User not found' })
    async findById(@Param('id') id: string) {
        try{
            const user = await this.usersService.findById(id);
            if(!user) throw new NotFoundException('User not found');
            return new ResponseUserDto(user);
        } catch (error) {
            throw error instanceof HttpException
                ? error
                : new HttpException('Error trying to get a user', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update an user by ID' })
    @ApiResponse({ status: 200, description: 'User updated', /*type: UsuarioResponseDto */})
    @ApiNotFoundResponse({ description: 'User not found' })
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an user by ID' })
    @ApiResponse({ status: 200, description: 'User deleted' })
    @ApiNotFoundResponse({ description: 'User not found' })
    async remove(@Param('id') id: string) {
        try {
            const userDeleted = await this.usersService.remove(id);
            if(!userDeleted) throw new NotFoundException('User not found');
            return new ResponseUserDto(userDeleted);
        } catch (error) {
            throw error instanceof HttpException
            ? error
            : new HttpException('Error deleting the user', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}