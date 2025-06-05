import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "src/dto/create-user.dto";
import { UpdateUserDto } from "src/dto/update-user.dto";
import { User, UserDocument } from "src/schema/user.schema";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async create(createUserDto: CreateUserDto) : Promise<UserDocument> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async findAll(): Promise<User[]> {
        const res =  await this.userModel.find().lean();
        return res;
    }

    async findById(id: string): Promise<UserDocument | null | undefined> {
        return this.userModel.findById(id);
    }

    async findByEmail(email: string): Promise<UserDocument | null | undefined> {
        return this.userModel.findOne({ email }).exec();
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<boolean> {
        await this.userModel.findByIdAndUpdate(id, updateUserDto, {
            new: true,
        });
        return true;
    }

    async remove(id: string): Promise<UserDocument | null> {
        return this.userModel.findByIdAndDelete(id).exec();
    }
}