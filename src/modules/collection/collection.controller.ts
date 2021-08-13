import { Controller, Param, Request, Res, Get, UseGuards, HttpStatus } from '@nestjs/common';
import { AppUtils } from 'src/utils/app.utils';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CollectionService } from './collection.service';

const controller = 'collection';
const get_system_controller = 'system';
const get_user_controller = 'user';
const get_path_controller = 'path';
const get_page_controller = 'page';
const get_all_controller = 'all';

const get_systemPageByPath = `${get_path_controller}/${get_page_controller}/${get_system_controller}`;
const get_systemAllByPath = `${get_path_controller}/${get_all_controller}/${get_system_controller}`;

@Controller(controller)
export class CollectionController {

    constructor(private collectionService: CollectionService, private appUtils: AppUtils){}

    @UseGuards(JwtAuthGuard)
    @Get(`${get_system_controller}/:type`)
    async getSystemCollections(@Param() param, @Res() res){
        const type = param.type;
        const content = await this.collectionService.getSystemCollectionsByType(type);console.log(content)

        res.status(HttpStatus.OK).json({
            status: true,
            type: type,
            message: content
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get(`${get_user_controller}/:type/:name`)
    async getUserCollections(@Param() param, @Res() res){
        const type = param.type;
        const name = param.name;
        const content = [];

        res.status(HttpStatus.OK).json({
            status: true,
            message: content
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get(`${get_systemPageByPath}/:type/:position/*`)
    async getPageSystemCollectionByPath(@Param() param, @Request() req, @Res() res){

        const type = param.type;
        const position = parseInt(param.position);
        const collectionPath = this.appUtils.getCleanSystemMediaPath(`${controller}/${get_systemPageByPath}/${type}/${position}`, req.url, type);console.log(type, position, collectionPath)
        const content = await this.collectionService.getSystemCollectionPage(collectionPath, type, position);

        res.status(HttpStatus.OK).json({
            status: true,
            message: content
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get(`${get_systemAllByPath}/:type/*`)
    async getAllSystemCollectionByPath(@Param() param, @Request() req, @Res() res){

        const type = param.type;
        const collectionPath = this.appUtils.getCleanSystemMediaPath(`${controller}/${get_systemAllByPath}/${type}}`, req.url, type);console.log(type, collectionPath)
        const content = await this.collectionService.getSystemCollectionAll(collectionPath, type);

        res.status(HttpStatus.OK).json({
            status: true,
            message: content
        });
    }
}
