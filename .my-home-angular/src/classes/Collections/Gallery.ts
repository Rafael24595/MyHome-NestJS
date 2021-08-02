import { FileCollectionAbstract } from "./FileColectionAbstract";
import { Picture } from "../File/Picture";

export class Gallery extends FileCollectionAbstract{

    list:Picture[];

    constructor(name:string, owner: string, userView:boolean, userManage:boolean, privateState:boolean, list:Picture[], systemList: boolean){
        super(name, owner, userView, userManage, privateState, systemList, '');
        this.list = list;
    }

}
