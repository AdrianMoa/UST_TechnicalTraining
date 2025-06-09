import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { boolean } from "joi";
import { AuthUser } from "src/common/decorator/decorator.auth_user";
import { AccessTokenGuard } from "src/common/guards/guard.access_token";
import { RefreshTokenGuard } from "src/common/guards/guard.refresh_token";
import { AuthDto } from "src/dto/auth.dto";
import { CreateUserDto } from "src/dto/create-user.dto";
import { AuthService } from "src/service/auth/auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    @ApiOperation({ summary: 'Create a new user'})
    @ApiCreatedResponse({ description: 'User has been created sucessfully', /*type: [CreateUserDto] */})
    @ApiBadRequestResponse({ description: 'Error: User not created!' })
    signup(@Body() createUserDto: CreateUserDto) {
        return this.authService.signUp(createUserDto);
    }

    @Post('signin')
    @ApiOperation({ summary: 'Login user'})
    @ApiOkResponse({ description: 'User valid', /*type: [LoginResponse] */})
    @ApiBadRequestResponse({ description: 'Error: Invalid credentials!' })
    signin(@Body() data: AuthDto) {
        console.clear();
        console.log(data);
        return this.authService.signIn(data);
    }

    @UseGuards(AccessTokenGuard)
    @Get('logout')
    @ApiOperation({ summary: 'Logout user' })
    @ApiOkResponse({ type: [boolean] })
    @ApiBadRequestResponse({ description: ''})
    logout(@AuthUser('sub') sub: string) {
        return this.authService.logout(sub);
    }

    @UseGuards(RefreshTokenGuard)
    @Get('refresh')
    @ApiOperation({ summary: 'Refresh token' })
    @ApiOkResponse({ type: [boolean] })
    @ApiBadRequestResponse({ description: ''})
    refreshTokens (
        @AuthUser('sub') sub: string,
        @AuthUser('refreshToken') refreshToken: string,
    ) {
        return this.authService.refreshTokens(sub, refreshToken);
    }
}