import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth/auth.service";
import { User } from "src/classes/User";
import { user_config } from "../variables/Globals";

@Injectable()
export class AuthTools{

    ItemName = 'session-token';
    URIName = 'last-uri';

    constructor(private authService: AuthService,  private router: Router){}

    public getToken(): string | null{
        return localStorage.getItem(this.ItemName);
    }

    public setToken(token: string): void{
        localStorage.setItem(this.ItemName, token);
    }

    public setUser(user: User | undefined):void{
        user_config.user = user;
    }

    public setCookie(token: string):void{
        document.cookie = `token=${token};path=/`;
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

    getLastURI(){
        return localStorage.getItem(this.URIName);
    }

    setLastURI(){
        const href = decodeURIComponent(this.router.url);
        localStorage.setItem(this.URIName, href);
    }

    goLastURI(){
        const uri = this.getLastURI();
        this.router.navigate([uri]);
    }

    destroySession(){
        this.setToken('');
        this.setUser(undefined);
    }

    checkSession(){
        const token = this.getToken();
        this.setLastURI();
        if (!token || !user_config.user) this.router.navigate(['/Login']); 
    }

}