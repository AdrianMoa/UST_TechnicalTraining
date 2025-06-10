import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "src/dto/create-user.dto";
import { UpdateUserDto } from "src/dto/update-user.dto";
import { IUser } from "src/interface/user.interface";
import { User, UserDocument } from "src/schema/user.schema";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async create(createUserDto: CreateUserDto) : Promise<IUser> {
        const user = new this.userModel(createUserDto);
        const saved = await user.save();
        return this.toIUser(saved.toObject());
    }

    async findAll(): Promise<IUser[]> {
        const res =  await this.userModel.find().lean();
        return res.map(u => this.toIUser(u));
    }

    async findById(id: string): Promise<IUser | null > {
        const user = await this.userModel.findById(id).lean();
        return user ? this.toIUser(user) : null;
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

    async remove(id: string): Promise<IUser | null> {
        const userDeleted = await this.userModel.findByIdAndDelete(id).exec();
        return userDeleted ? this.toIUser(userDeleted) : null;
    }

    private toIUser(data: any) : IUser {
        return {
            id: data._id.toString(),
            name: data.name,
            email: data.email,
            refreshToken: data.refreshToken,
            refreshTokenExpiration: data.refreshTokenExpiration
        };
    }
}