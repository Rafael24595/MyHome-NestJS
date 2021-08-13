import { FileCollectionAbstract } from "./FileColectionAbstract";
import { Picture } from "../File/Picture";

export class Gallery extends FileCollectionAbstract{

    list:Picture[];
    totalElements: number;
    imageElements: number;

    constructor(name:string, owner: string, userView:boolean, userManage:boolean, privateState:boolean, list:Picture[], systemList: boolean, path: string, totalElements: number, imageElements: number){
        super(name, owner, userView, userManage, privateState, systemList, path);
        this.list = list;
        this.totalElements = totalElements;
        this.imageElements = imageElements;
    }

    static interfaceToGalleryArray(list: Gallery[], path: string): Gallery[]{
        let listArray = [];
        for (let index = 0; index < list.length; index++) {
            const element = list[index];
            listArray.push(new Gallery(element.name, element.owner, element.userView,element.userManage,element.privateState,element.list,element.systemList,`${path}/${element.name}`, element.totalElements, element.imageElements));
            
        }
        return listArray;
    }

}
