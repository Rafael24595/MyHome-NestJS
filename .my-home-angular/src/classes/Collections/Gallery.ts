import { FileCollectionAbstract } from "./FileColectionAbstract";
import { Picture } from "../File/Picture";

export class Gallery extends FileCollectionAbstract{

    list:Picture[];

    constructor(name:string, userView:boolean, userManage:boolean, privateState:boolean, list:Picture[], hotList: boolean){
        super(name, userView, userManage, privateState, hotList);
        this.list = list;
    }

}
