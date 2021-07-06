import { FileCollectionAbstract } from "./FileColectionAbstract";
import { Theme } from "../File/Theme";

export class PlayListVideo extends FileCollectionAbstract{
    
    list:Theme[];

    constructor(name:string, userView:boolean, userManage:boolean, privateState:boolean, list:Theme[], hotList: boolean){
        super(name, userView, userManage, privateState, hotList);
        this.list = list;
    }

}
