import { Module } from '@nestjs/common';
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
  providers: [UserService, UserUtils]
})
export class UserModule {}
