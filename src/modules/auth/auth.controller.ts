import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { User } from '../user/interfaces/user.interface';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() user:{nickname: string, password: string}){
        return this.authService.login(user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req){
        return req.user
    }
}
