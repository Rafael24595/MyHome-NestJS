import { Module } from '@nestjs/common';
import { AppUtils } from 'src/utils/app.utils';
import { DirectoryUtils } from '../directory/utils/directory.utils';
import { FileUtils } from '../file/utils/file.utils';
import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';
import { CollectionUtils } from './utils/collection.utils';

@Module({
    imports:[],
    controllers: [CollectionController],
    providers: [CollectionService, AppUtils, DirectoryUtils, FileUtils],
    exports:[CollectionUtils]
})
export class CollectionModule {}
