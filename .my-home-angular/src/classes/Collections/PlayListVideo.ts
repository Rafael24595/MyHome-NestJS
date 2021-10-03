import { FileCollectionAbstract } from "./FileColectionAbstract";
import { Theme } from "../File/Theme";
import { logos_name } from "src/utils/variables/Globals";

export class PlayListVideo extends FileCollectionAbstract{
    
    list:Theme[];
    totalElements: number;
    videoElements: number;

    constructor(name:string, owner: string, userView:boolean, userManage:boolean, privateState:boolean, list:Theme[], systemList: boolean, path: string, totalElements: number, videoElements: number, location?: string, image?: string, total?: number, position?: number){
        image = (image) ? image : logos_name.video_collection;
        super(name, owner, userView, userManage, privateState, systemList, path, list, location, image, total, position);
        this.list = list;
        this.totalElements = totalElements;
        this.videoElements = videoElements;
    }

    static interfaceToPlayListVideoArray(list: PlayListVideo[], path: string): PlayListVideo[]{
        let listArray = [];
        for (let index = 0; index < list.length; index++) {
            const element = list[index];
            listArray.push(new PlayListVideo(element.name, element.owner, element.userView,element.userManage,element.privateState,element.list,element.systemList,`${path}/${element.name}`, element.totalElements, element.videoElements, element.location, element.image, element.total, element.position));
            
        }
        return listArray;
    }

}
