import { Injectable } from '@nestjs/common';
import { UserService } from "../user/user.service";
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/interfaces/user.interface';

@Injectable()
export class AuthService {
    constructor (private userService: UserService, private jwtService: JwtService){}

    async validateUser(userNickname: string, password: string): Promise<any>{
        const user = await this.userService.getUser(userNickname);
        if(user && user.password === password){
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    async login (user: User): Promise<{access_token: string}>{
        const payload = { nickname: user.nickname, email: user.email };
        return{
            access_token: this.jwtService.sign(payload)
        }

    }
}
