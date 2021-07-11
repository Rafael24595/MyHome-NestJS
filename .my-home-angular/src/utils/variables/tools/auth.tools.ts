import { Injectable } from "@angular/core";
import { AuthService } from "src/app/services/auth/auth.service";
import { User } from "src/classes/User";
import { user_config } from "../Globals";

@Injectable()
export class AuthTools{

    ItemName = 'session-token';

    constructor(private authService: AuthService){}

    public getToken(): string | null{
        return localStorage.getItem(this.ItemName);
    }

    public setToken(token: string): void{
        localStorage.setItem(this.ItemName, token);
    }

    public setUser(user: User):void{
        user_config.user = user;
    }

    public setCookie(token: string):void{
        document.cookie = `token=${token}`;
        this.authService.setCookies().subscribe(
            sucess=>{
                console.log(sucess.message);
            },
            err=>{
                console.error(err);
            }
        );
    }

    public setUserSession(user: User):void{
        const token = this.getToken();
        this.setUser(user);
        if(token)
            this.setCookie(token);
    }

    public setUserSessionToken(user: User, token: string):void{
        this.setUser(user);
        this.setToken(token);
        this.setCookie(token);
    }

}