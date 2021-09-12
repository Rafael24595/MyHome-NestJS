import { FileCollectionAbstract } from "./FileColectionAbstract";
import { Picture } from "../File/Picture";
import { logos_name } from "src/utils/variables/Globals";

export class Gallery extends FileCollectionAbstract{

    list:Picture[];
    totalElements: number;
    imageElements: number;

    constructor(name:string, owner: string, userView:boolean, userManage:boolean, privateState:boolean, list:Picture[], systemList: boolean, path: string, totalElements: number, imageElements: number, location?: string, image?: string, total?: number, position?: number){
        image = (image) ? image : logos_name.image_collection;
        super(name, owner, userView, userManage, privateState, systemList, path, list, location, image, total, position);
        this.list = list;
        this.totalElements = totalElements;
        this.imageElements = imageElements;
    }

    static interfaceToGallery(gallery: Gallery, path: string): Gallery{
        return new Gallery(gallery.name, gallery.owner, gallery.userView,gallery.userManage,gallery.privateState,gallery.list,gallery.systemList,`${path}/${gallery.name}`, gallery.totalElements, gallery.imageElements, gallery.location, gallery.image, gallery.total, gallery.position);
    }
    static interfaceToGalleryArray(list: Gallery[], path: string): Gallery[]{
        let listArray = [];
        for (let index = 0; index < list.length; index++) {
            const element = list[index];
            listArray.push(new Gallery(element.name, element.owner, element.userView,element.userManage,element.privateState,element.list,element.systemList,`${path}/${element.name}`, element.totalElements, element.imageElements, element.location, element.image, element.total, element.position));
            
        }
        return listArray;
    }

}
