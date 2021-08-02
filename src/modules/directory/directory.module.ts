import { Module } from '@nestjs/common';
import { DirectoryService } from './directory.service';
import { DirectoryController } from './directory.controller';
import { AppUtils } from 'src/utils/app.utils';
import { DirectoryUtils } from './utils/directory.utils';
import { FileUtils } from '../file/utils/file.utils';

@Module({
    imports:[],
    controllers: [DirectoryController],
    providers: [DirectoryService, DirectoryUtils, AppUtils, FileUtils],
    exports:[DirectoryUtils]
})
export class DirectoryModule {}
