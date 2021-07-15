import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./schemas/user.schema";
import { UserUtils } from './utils/user.utils';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name: 'User', schema: UserSchema}
    ])
  ],
  controllers: [UserController],
  providers: [UserService, UserUtils],
  exports: [UserService, UserUtils]
})
export class UserModule /*implements NestModule*/ {
  /*configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(UserMiddleware)
    .exclude(
      { path: '/api/user', method: RequestMethod.GET },
      { path: '/api/user/:userNickname', method: RequestMethod.GET },
    )
    .forRoutes(UserController)
  }*/
}