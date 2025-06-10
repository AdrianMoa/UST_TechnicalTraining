import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "./users.module";
import { AuthController } from "src/controller/auth/auth.controller";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "src/service/auth/auth.service";
import { AccessTokenStrategy } from "src/strategies/accessToken.strategy";
import { RefreshTokenStrategy } from "src/strategies/refreshToken.strategy";

@Module({
    imports: [
        PassportModule,
        JwtModule.register({secret: process.env.JWT_ACCESS_SECRET,}),
        UsersModule,
    ],
    controllers: [AuthController],
    providers: [ConfigService, AuthService, AccessTokenStrategy, RefreshTokenStrategy, ],
})
export class AuthModule {}