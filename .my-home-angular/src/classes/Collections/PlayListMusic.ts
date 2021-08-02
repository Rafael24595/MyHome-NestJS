import { FileCollectionAbstract } from "./FileColectionAbstract";
import { Theme } from "../File/Theme";

export class PlayListMusic extends FileCollectionAbstract{
    
    list:Theme[];

    constructor(name:string, owner: string, userView:boolean, userManage:boolean, privateState:boolean, list:Theme[], systemList: boolean, path: string){
        super(name, owner, userView, userManage, privateState, systemList, path);
        this.list = list;
    }

    static interfaceToPlayListMusicArray(list: PlayListMusic[], path: string): PlayListMusic[]{
        let listArray = [];
        for (let index = 0; index < list.length; index++) {
            const element = list[index];
            listArray.push(new PlayListMusic(element.name, element.owner, element.userView,element.userManage,element.privateState,element.list,element.systemList,`${path}/${element.name}`));
            
        }
        return listArray;
    }

}
