import { Controller, Request, Res, Get, UseGuards, Post, Delete, BadRequestException, HttpStatus } from '@nestjs/common';
import { statSync } from 'fs';
import { AppUtils } from 'src/utils/app.utils';
import { DirectoryService } from './directory.service';

const controller = 'directory';

@Controller(controller)
export class DirectoryController {

    constructor(private directoryService: DirectoryService, private appUtils: AppUtils){}

    @Get('*')
    async getDirectoryContent(@Request() req, @Res() res){

        const filePath = this.appUtils.getCleanRelativePath(controller, req.url);
        const content = await this.directoryService.getDirectoryContent(filePath);
        console.log(content)

        res.status(HttpStatus.OK).json({
            status: true,
            message: content
        });

    }

}
