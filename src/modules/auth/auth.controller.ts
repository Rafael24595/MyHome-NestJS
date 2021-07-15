import { Controller, Request, Res, Post, UseGuards, Get, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtCookieAuthGuard } from './guards/jwt-cookie-auth.guard';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService, private userService: UserService){}
    
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() user:{nickname: string, password: string}){
        return this.authService.login(user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('token/profile')
    async getProfile(@Request() req, @Res() res){console.log('in')
        const user = await this.userService.getUser(req.user.nickname);
        res.status(HttpStatus.OK).json({
            status: true,
            user: user
        });
    }

    @UseGuards(JwtCookieAuthGuard)
    @Get('cookie')
    setCookieLink( @Res() res){
        res.status(HttpStatus.OK).json({
            status: true,
            message: "Token cookie is setted"
        });
    }

}
