export class FormValidation{

    public static hashPassword(password:string){
        return md5(password);
    }

}