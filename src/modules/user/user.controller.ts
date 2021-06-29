import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, ForbiddenException } from '@nestjs/common';

import { CreateUserDTO } from "./dto/user.dto";

import { UserService } from "./user.service";
import { UserUtils } from './utils/user.utils';

@Controller('user')
export class UserController {

    constructor(private userService: UserService, private userUtils: UserUtils){}

    @Get()
    async getUsers(@Res() res){
        const users = await this.userService.getUsers();
        res.status(HttpStatus.OK).json({
            status: true,
            message: users
        });
    }

    @Get(':userNickname')
    async getUser(@Res() res, @Param('userNickname') userNickname){
        const user = await this.userService.getUser(userNickname);
        if(!user) throw new NotFoundException('User Does not exists');
        res.status(HttpStatus.OK).json({
            status: true,
            message: user
        });
    }

    @Post()
    async setUser(@Res() res, @Body() createUserDTO: CreateUserDTO){
        await this.userUtils.userByDataExistsException(createUserDTO.nickname, createUserDTO.email);
        const user = await this.userService.createUser(createUserDTO);
        res.status(HttpStatus.OK).json({
            status: true,
            message: "User created"
        });
    }

    @Delete(':userNickname')
    async deleteUser(@Res() res, @Param('userNickname') userNickname){
        const user = await this.userService.deleteUser(userNickname);
        if(!user) throw new NotFoundException('User Does not exists');
        res.status(HttpStatus.OK).json({
            status: true,
            message: 'User deleted'
        });
    }

    @Put(':userNickname')
    async updateUser(@Res() res, @Param('userNickname') userNickname,  @Body() createUserDTO: CreateUserDTO){
        if(userNickname != createUserDTO.nickname) throw new ForbiddenException('Cannot modify nickname attribute');
        await this.userUtils.userByEmailExistsException(userNickname, createUserDTO.email);
        const user = await this.userService.updateUser(userNickname, createUserDTO);
        if(!user) throw new NotFoundException('User Does not exists');
        res.status(HttpStatus.OK).json({
            status: true,
            message: user
        });
    }

}
