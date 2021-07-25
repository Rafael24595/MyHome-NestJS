import { Controller, Request, Res, Get, UseGuards, Post, Delete, BadRequestException, HttpStatus } from '@nestjs/common';
import { AppUtils } from 'src/utils/app.utils';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DirectoryService } from './directory.service';

const controller = 'directory';

@Controller(controller)
export class DirectoryController {

    constructor(private directoryService: DirectoryService, private appUtils: AppUtils){}

    @UseGuards(JwtAuthGuard)
    @Get('*')
    async getDirectoryContent(@Request() req, @Res() res){
        const isRoot = this.appUtils.isRoot(controller, req.url);
        const filePath = this.appUtils.getCleanRelativePath(controller, req.url);
        const content = await this.directoryService.getDirectoryContent(filePath, isRoot);

        res.status(HttpStatus.OK).json({
            status: true,
            message: content
        });

    }

}
