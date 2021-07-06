import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { FileUtils } from './utils/file.utils';

@Module({
    imports:[],
    controllers: [FileController],
    providers: [FileService, FileUtils],
    exports: [FileUtils]
  })
export class FileModule {}
