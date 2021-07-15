export class AuthUtils{

    constructor(){}

    clearToken(token: string): string {
        if(token){
            token = token.replace(/Bearer/g, '').trim();
        }
        return token;
    }

}