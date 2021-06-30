import { Injectable } from '@nestjs/common';
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
    constructor (private userService: UserService){}

    async validateUser(userNickname: string, password: string): Promise<any>{
        const user = await this.userService.getUser(userNickname);
        if(user && user.password === password){
            const { password, ...result } = user;
            return result;
        }

        return null;
    }
}
