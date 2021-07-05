import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from "../user/user.module";
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './variables/variables';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { CookieStrategy } from './strategies/jwt-cookie.strategy';
import { AuthUtils } from './utils/auth.utils';

@Module({
  imports:[
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '24h'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthUtils, LocalStrategy, JwtStrategy, CookieStrategy],
  exports: [AuthService, AuthUtils, JwtModule]
})
export class AuthModule {}
