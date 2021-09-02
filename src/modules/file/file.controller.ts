import { Controller, Request, Res, Get, UseGuards, Post, Delete, BadRequestException } from '@nestjs/common';
import { existsSync, readFileSync, statSync } from 'fs';
import { AppUtils } from 'src/utils/app.utils';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtCookieAuthGuard } from '../auth/guards/jwt-cookie-auth.guard';
import { FileService } from './file.service';
import { FileUtils } from './utils/file.utils';
import { join } from 'path';
import { PathVariables } from 'src/utils/variables/Variables';

const controller = 'file';
const get_file_Controller = 'data';
const get_thumbnail_Controller = 'thumbnail';
const get_preview_Controller = 'preview';

@Controller(controller)
export class FileController {

    constructor(private fileService:FileService, private fileUtils:FileUtils, private appUtils:AppUtils){}

    @UseGuards(JwtCookieAuthGuard)
    @Get(`${get_file_Controller}/*`)
    async getFile(@Request() req, @Res() res){

        const filePath = this.appUtils.getCleanRelativePath(`${controller}/${get_file_Controller}`, req.url);
        const isImage = this.fileUtils.isImage(filePath);

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

    @Get(`${get_thumbnail_Controller}/*`)
    async getVideoThumbnail(@Request() req, @Res() res){
 
        const filePath = this.appUtils.getCleanRelativePath(`${controller}/${get_thumbnail_Controller}`, req.url);
        const fileHash = this.appUtils.getFileHash(filePath);
        const thumbnailPath = join(PathVariables.tmp_thumbnails, `${fileHash}.png`);

        if(!existsSync(thumbnailPath)){
            await this.fileUtils.generateThumbnail(filePath, thumbnailPath);
        }

        const data = readFileSync(thumbnailPath);

        res.writeHead(200, {'Content-Type': 'image/jpg'});
        res.end(data);

    }

    @Get(`${get_preview_Controller}/*`)
    async getImagePreview(@Request() req, @Res() res){
 
        const filePath = this.appUtils.getCleanRelativePath(`${controller}/${get_preview_Controller}`, req.url);
        const fileHash = this.appUtils.getFileHash(filePath);
        const thumbnailPath = join(PathVariables.tmp_thumbnails, `preview-${fileHash}.png`);
        let finalPath = thumbnailPath;

        if(this.appUtils.extname(filePath) == 'gif'){
            finalPath = filePath;
        }
        else if(!existsSync(thumbnailPath)){
            await this.fileUtils.generateThumbnail(filePath, thumbnailPath, 540);
        }

        const data = readFileSync(finalPath);

        res.writeHead(200, {'Content-Type': 'image/jpg'});
        res.end(data);

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
