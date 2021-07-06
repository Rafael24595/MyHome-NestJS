import { Controller, Request, Res, Get, Query, UseGuards, Post, Delete, BadRequestException } from '@nestjs/common';
import { statSync } from 'fs';
import { join } from 'path';
import { PathVariables } from 'src/utils/Variables';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtCookieAuthGuard } from '../auth/guards/jwt-cookie-auth.guard';
import { FileService } from './file.service';
import { FileUtils } from './utils/file.utils';

@Controller('file')
export class FileController {

    constructor(private fileService:FileService, private fileUtils:FileUtils){}

    @UseGuards(JwtCookieAuthGuard)
    @Get()
    async getFile(@Request() req, @Query() filePathQuery: {filePath:string}, @Res() res){
        
        const range = req.headers.range;
        if (!range) throw new BadRequestException('Requires Range header');

        const filePath = filePathQuery.filePath;
        const relativePath = join(__dirname, PathVariables.private_assets , filePath);
        const videoSize = statSync(relativePath).size;
        const start = this.fileUtils.setStart(range);
        const end = this.fileUtils.setEnd(start, videoSize);
        const headers = this.fileUtils.setHeaders(start, end, videoSize);

        res.writeHead(206, headers);

        const videoStream = await this.fileService.getFileStream(relativePath, start, end);
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
