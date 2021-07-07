import { Controller, Request, Res, Get, UseGuards, Post, Delete, BadRequestException } from '@nestjs/common';
import { statSync } from 'fs';
import { join } from 'path';
import { AppUtils } from 'src/utils/app.utils';
import { PathVariables } from 'src/utils/Variables';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtCookieAuthGuard } from '../auth/guards/jwt-cookie-auth.guard';
import { FileService } from './file.service';
import { FileUtils } from './utils/file.utils';

const controller = 'file';

@Controller(controller)
export class FileController {

    constructor(private fileService:FileService, private fileUtils:FileUtils, private appUtils:AppUtils){}

    @UseGuards(JwtCookieAuthGuard)
    @Get('*')
    async getFile(@Request() req, @Res() res){

        const range = req.headers.range;
        if (!range) throw new BadRequestException('Requires Range header');

        const filePath = this.appUtils.getCleanRelativePath(controller, req.url);
        const videoSize = statSync(filePath).size;
        const start = this.fileUtils.setStart(range);
        const end = this.fileUtils.setEnd(start, videoSize);
        const headers = this.fileUtils.setHeaders(start, end, videoSize);

        res.writeHead(206, headers);

        const videoStream = await this.fileService.getFileStream(filePath, start, end);
        videoStream.pipe(res);

    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async setFile(){
        //TODO Añadir toda la lógica
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteFile(){
        //TODO Añadir toda la lógica
    }


}
