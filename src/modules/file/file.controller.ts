import { Controller, Request, Res, Get, UseGuards, Post, Delete, BadRequestException } from '@nestjs/common';
import { readFileSync, statSync } from 'fs';
import path, { join } from 'path';
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

        const filePath = this.appUtils.getCleanRelativePath(controller, req.url);
        const isImage = this.fileUtils.typeFile(filePath);

        if(isImage){
            const data = readFileSync(filePath);

            res.writeHead(200, {'Content-Type': 'image/jpg'});
            res.end(data);
        }
        else{

            const range = req.headers.range;

            if (!range) throw new BadRequestException('Requires Range header');

            const videoSize = statSync(filePath).size;
            const start = (!isImage) ? this.fileUtils.setStart(range) : 0;
            const end = this.fileUtils.setEnd(start, videoSize);
            const headers = this.fileUtils.setHeaders(start, end, videoSize);

            res.writeHead(206, headers);

            const videoStream = await this.fileService.getFileStream(filePath, start, end);
            videoStream.pipe(res); 
        }

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
