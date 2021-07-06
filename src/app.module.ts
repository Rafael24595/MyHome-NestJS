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

const mongoUri = "mongodb://localhost:27017/myhome";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    MongooseModule.forRoot(mongoUri), 
    UserModule, AuthModule, FileModule
  ],
  controllers: [
    AppController,
    FileController
  ],
  providers: [
    AppService,
    FileService
  ],
})
export class AppModule {}
