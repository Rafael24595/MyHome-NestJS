import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { User } from '../user/interfaces/user.interface';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    
    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req:{user:User}){
        return this.authService.login(req.user);
    }
}
