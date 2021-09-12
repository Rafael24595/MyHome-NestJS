import { FileCollectionAbstract } from "./FileColectionAbstract";
import { Text } from "../File/Text";

export class Library extends FileCollectionAbstract{
    
    list:Text[];

    constructor(name:string, owner: string, userView:boolean, userManage:boolean, privateState:boolean, list:Text[], systemList: boolean){
        super(name, owner, userView, userManage, privateState, systemList, '', list);
        this.list = list;
    }

}
