export class AuthUtils{

    constructor(){}

    clearToken(token: string): string {
        token = token.replace(/Bearer/g, '').trim();
        return token;
    }

}