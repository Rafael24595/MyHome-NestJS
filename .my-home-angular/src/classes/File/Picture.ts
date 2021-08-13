import { FileAbstract } from "./FileAbstract";

export class Picture extends FileAbstract{

    constructor(id: string,path:string,createdBy: string,autor:{id:string, name:string},dateCreated: number,dateModify: number,tags: string[]){
        super(id,path,createdBy,autor,dateCreated,dateModify,tags);
    }

    static getEmptyPicture(): Picture{
        return new Picture('','','',{id:'',name:''},0,0,[]);
    }

    static interfaceToPicture(interfaceGallery:Picture[]): Picture[]{
        let gallery = [];
        for (let index = 0; index < interfaceGallery.length; index++) {
            const picture = interfaceGallery[index];
            gallery.push(new Picture(picture.id,picture.path,picture.createdBy,picture.autor,picture.dateCreated, picture.dateModify, picture.tags));
        }
        return gallery;
    }

}