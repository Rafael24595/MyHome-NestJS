import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FileController } from './modules/file/file.controller';
import { FileService } from './modules/file/file.service';
import { FileModule } from './modules/file/file.module';
import { AppUtils } from './utils/app.utils';
import { DirectoryModule } from './modules/directory/directory.module';
import { FileUtils } from './modules/file/utils/file.utils';
import { Shedule } from './utils/shedule.job';
import { CollectionController } from './modules/collection/collection.controller';
import { CollectionService } from './modules/collection/collection.service';
import { CollectionUtils } from './modules/collection/utils/collection.utils';

const mongoUri = "mongodb://localhost:27017/myhome";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    MongooseModule.forRoot(mongoUri), 
    UserModule, AuthModule, FileModule, DirectoryModule
  ],
  controllers: [
    AppController,
    FileController,
    CollectionController
  ],
  providers: [
    AppService,
    FileService,
    CollectionService,
    AppUtils,
    FileUtils,
    CollectionUtils,
    Shedule
  ],
  exports:[
    AppUtils,
    FileUtils
  ]
})
export class AppModule {}
