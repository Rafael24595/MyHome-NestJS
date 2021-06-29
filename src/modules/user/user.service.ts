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

    async getUser(userEmail: string): Promise<User>{
        const user = await this.userModel.findOne({email:userEmail});
        return user;
    }

    async createUser(createUserDTO: CreateUserDTO): Promise<User>{
        const user = new this.userModel(createUserDTO);
        await user.save();
        return user;
    }

    async deleteUser(userEmail: string): Promise<User>{
        const deletedUser = await this.userModel.findOneAndDelete({email:userEmail});
        return deletedUser;
    }

    async updateUser(userEmail:string, createUserDTO: CreateUserDTO): Promise<User>{
        const user = this.userModel();
        return user;
    }

}
