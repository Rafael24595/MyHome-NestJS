import { Controller, Request, Res, Post, UseGuards, Get, Body, Query, HttpStatus } from '@nestjs/common';
import { join } from 'path';
import { createReadStream, statSync } from 'fs';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtCookieAuthGuard } from './guards/jwt-cookie-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() user:{nickname: string, password: string}){
        return this.authService.login(user);
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
