import { FileCollectionAbstract } from "./FileColectionAbstract";
import { Theme } from "../File/Theme";
import { logos_name } from "src/utils/variables/Globals";

export class PlayListMusic extends FileCollectionAbstract{
    
    list:Theme[];

    constructor(name:string, owner: string, userView:boolean, userManage:boolean, privateState:boolean, list:Theme[], systemList: boolean, path: string, location?: string, image?: string){
        image = (image) ? image : logos_name.audio_collection;
        super(name, owner, userView, userManage, privateState, systemList, path, location, image);
        this.list = list;
    }

    static interfaceToPlayList(playList: PlayListMusic, path:string):PlayListMusic{
        return new PlayListMusic(playList.name,playList.owner,playList.userView,playList.userManage,playList.privateState,playList.list,playList.systemList,`${path}/${playList.name}`,playList.location);
    }

    static interfaceToPlayListMusicArray(list: PlayListMusic[], path: string): PlayListMusic[]{
        let listArray = [];
        for (let index = 0; index < list.length; index++) {
            const element = list[index];
            listArray.push(new PlayListMusic(element.name, element.owner, element.userView,element.userManage,element.privateState,element.list,element.systemList,`${path}/${element.name}`, element.location));
            
        }
        return listArray;
    }

}
