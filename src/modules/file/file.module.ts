import { Module } from '@nestjs/common';
import { AppUtils } from 'src/utils/app.utils';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { FileUtils } from './utils/file.utils';

@Module({
    imports:[],
    controllers: [FileController],
    providers: [FileService, FileUtils, AppUtils],
    exports: [FileUtils]
  })
export class FileModule {}
