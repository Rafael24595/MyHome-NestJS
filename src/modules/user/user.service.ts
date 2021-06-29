import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./interfaces/user.interface";
import { CreateUserDTO } from "./dto/user.dto";


@Injectable()
export class UserService {

    constructor(@InjectModel('User') private userModel:Model<User>){}

    async getUsers(): Promise<User[]>{
        const users = await this.userModel.find();
        return users;
    }

    async getUser(userNickName: string): Promise<User>{
        const user = await this.userModel.findOne({nickname:userNickName});
        return user;
    }

    async createUser(createUserDTO: CreateUserDTO): Promise<User>{
        const user = new this.userModel(createUserDTO);
        await user.save();
        return user;
    }

    async deleteUser(userNickName: string): Promise<User>{
        const deletedUser = await this.userModel.findOneAndDelete({nickname:userNickName});
        return deletedUser;
    }

    async updateUser(userNickName:string, createUserDTO: CreateUserDTO): Promise<User>{
        const updatedUser = await this.userModel.findOneAndUpdate({nickname:userNickName}, createUserDTO, {new: true});
        return updatedUser;
    }

}
