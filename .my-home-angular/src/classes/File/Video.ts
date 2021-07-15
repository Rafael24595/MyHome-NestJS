import { FileAbstract } from "./FileAbstract";

export class Video extends FileAbstract{

    constructor(id: string,path:string,name: string,extension: string,createdBy: string,autor:{id:string, name:string},dateCreated: number,dateModify: number,tags: string[]){
        super(id,path,name,extension,createdBy,autor,dateCreated,dateModify,tags);
    }

}