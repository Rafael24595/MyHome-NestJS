import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from './modules/user/user.module';

const mongoUri = "mongodb://localhost:27017/myhome";

@Module({
  imports: [
    MongooseModule.forRoot(mongoUri), 
    UserModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule {}
