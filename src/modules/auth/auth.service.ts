import { Injectable } from '@nestjs/common';
import { UserService } from "../user/user.service";
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from '../user/dto/user.dto';

@Injectable()
export class AuthService {
    constructor (private userService: UserService, private jwtService: JwtService){}

    async validateUser(nickname: string, password: string): Promise<any>{
        const user = await this.userService.getUser(nickname);
        if(user && user.password === password){
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    async login (user: {nickname: string, password: string}): Promise<{status: boolean, user:CreateUserDTO, access_token: string}>{
        const userExist = await this.userService.getUser(user.nickname);
        const payload = { nickname: userExist.nickname, email: userExist.email };
        return{
            status: true,
            user:userExist,
            access_token: this.jwtService.sign(payload)
        }

    }
}
