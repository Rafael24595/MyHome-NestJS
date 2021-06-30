import { ForbiddenException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../interfaces/user.interface";

export class UserUtils{

    constructor(@InjectModel('User') private userModel:Model<User>){}

    async userByNicknameExists(userNickname: string): Promise<boolean>{
        const user = await this.userModel.findOne({nickname:userNickname});
        return (user != null);
    }

    async userByEmailExists(userEmail: string): Promise<{exists:boolean, nickname:string}>{
        const user = await this.userModel.findOne({email:userEmail});
        return {exists:(user != null), nickname: (user) ? user.nickname : null};
    }

    async userByEmailExistsException(userNickname: string, userEmail: string){
        const userByEmail = await this.userByEmailExists(userEmail);
        if(userByEmail.exists && userByEmail.nickname != userNickname) throw new ForbiddenException('User email already exists');
    }

    async userByDataExistsException(userNickname: string, userEmail: string){
        if(await this.userByNicknameExists(userNickname)) throw new ForbiddenException('User nickname already exists');
        const userByEmail = await this.userByEmailExists(userEmail);
        if(userByEmail.exists) throw new ForbiddenException('User email already exists');
    }

    simplifyUser(user:User | User[]): User | User[]{
        if(Array.isArray(user)){
            for (let index = 0; index < user.length; index++) {
                user[index].email = "";
                user[index].password = "";
                user[index].playListMusic = [];
                user[index].playListVideo = [];
                user[index].gallery = [];
            }
        }
        else{
            user.email = "";
            user.password = "";
            user.playListMusic = [];
            user.playListVideo = [];
            user.gallery = [];
        }
        return user;
    }

    simplifyProfile(user:User): User{
            user.password = "";
        return user;
    }
}