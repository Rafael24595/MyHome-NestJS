import { FileCollectionAbstract } from "./FileColectionAbstract";
import { Text } from "../File/Text";

export class Library extends FileCollectionAbstract{
    
    list:Text[];

    constructor(name:string, userView:boolean, userManage:boolean, privateState:boolean, list:Text[], hotList: boolean){
        super(name, userView, userManage, privateState, hotList);
        this.list = list;
    }

}
