import { Controller, Param, Request, Res, Get, UseGuards, HttpStatus } from '@nestjs/common';
import { AppUtils } from 'src/utils/app.utils';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CollectionService } from './collection.service';

const controller = 'collection';

@Controller(controller)
export class CollectionController {

    constructor(private collectionService: CollectionService, private appUtils: AppUtils){}

    @UseGuards(JwtAuthGuard)
    @Get('system/:type')
    async getSystemCollection(@Param() param, @Res() res){
        const type = param.type;
        const content = await this.collectionService.getSystemCollectionsByType(type);console.log(content)

        res.status(HttpStatus.OK).json({
            status: true,
            type: type,
            message: content
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get('user/:type/:name')
    async getUserCollection(@Param() param, @Res() res){
        const type = param.type;
        const name = param.name;
        const content = [];

        res.status(HttpStatus.OK).json({
            status: true,
            message: content
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get('path/system/:type/:position/*')
    async getSystemCollectionByPath(@Param() param, @Request() req, @Res() res){

        const type = param.type;
        const position = parseInt(param.position);
        const collectionPath = this.appUtils.getCleanSystemMediaPath(`${controller}/path/system/${type}/${position}`, req.url, type);console.log(type, position, collectionPath)
        const content = await this.collectionService.getSystemCollectionsPage(collectionPath, type, position);

        res.status(HttpStatus.OK).json({
            status: true,
            message: content
        });
    }
}
