import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "../variables/variables";
import { Request} from 'express';
import { AuthUtils } from "../utils/auth.utils";

@Injectable()
export class CookieStrategy extends PassportStrategy(Strategy, 'jwt_cookie'){
    constructor(private authUtils: AuthUtils){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request)=>{
                const token = authUtils.clearToken(request?.cookies["token"]);console.log(token)
                if(!token){
                    return null;
                }
                return token;
            }]),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret
        });
    }

    async validate(payload: { nickname: string, email: string }){
        return { nickname: payload.nickname, email: payload.email }
    }
}