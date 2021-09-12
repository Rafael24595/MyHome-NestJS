import { FileCollectionAbstract } from "./FileColectionAbstract";
import { Theme } from "../File/Theme";

export class PlayListVideo extends FileCollectionAbstract{
    
    list:Theme[];

    constructor(name:string, owner: string, userView:boolean, userManage:boolean, privateState:boolean, list:Theme[], systemList: boolean){
        super(name, owner, userView, userManage, privateState, systemList, '', list);
        this.list = list;
    }

}
