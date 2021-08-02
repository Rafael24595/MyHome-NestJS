import { Controller, Param, Res, Get, UseGuards, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CollectionService } from './collection.service';

const controller = 'collection';

@Controller(controller)
export class CollectionController {

    constructor(private collectionService: CollectionService){}

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
}
