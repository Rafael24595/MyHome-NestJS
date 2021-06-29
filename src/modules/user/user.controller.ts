import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body } from '@nestjs/common';

import { CreateUserDTO } from "./dto/user.dto";

@Controller('user')
export class UserController {

    @Get()
    getUsers(@Res() res){
        res.status(HttpStatus.OK).json({
            status: "ok"
        });
    }

    @Get()
    getUser(@Res() res){
        res.status(HttpStatus.OK).json({
            status: "ok"
        });
    }

    @Post()
    setUser(@Res() res, @Body() createUserDTO: CreateUserDTO){
        res.status(HttpStatus.OK).json({
            status: "ok"
        });
    }

}
