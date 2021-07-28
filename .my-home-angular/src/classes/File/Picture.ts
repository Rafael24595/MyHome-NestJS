import { FileAbstract } from "./FileAbstract";

export class Picture extends FileAbstract{

    constructor(id: string,path:string,createdBy: string,autor:{id:string, name:string},dateCreated: number,dateModify: number,tags: string[]){
        super(id,path,createdBy,autor,dateCreated,dateModify,tags);
    }

}