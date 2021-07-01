import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { User } from '../user/interfaces/user.interface';
import { LocalAuthGuard } from './strategies/guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req:{user:User}){
        return req.user;
    }
}
