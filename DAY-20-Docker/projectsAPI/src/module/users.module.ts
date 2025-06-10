import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersController } from "src/controller/users/users.controller";
import { User, UserSchema } from "src/schema/user.schema";
import { UsersService } from "src/service/user/users.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema}]),],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {}