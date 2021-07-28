import { MiscTools } from "src/utils/tools/misc.tools";

export class FileAbstract{

    id: string;
    path:string;
    directory: string;
    name: string;
    extension: string;
    createdBy: string;
    autor:{id:string, name:string};
    dateCreated: number;
    dateModify: number;
    tags: string[];

    constructor(id: string,path:string,createdBy: string,autor:{id:string, name:string},dateCreated: number,dateModify: number,tags: string[]){
       this.id = id;
       this.path = path;
       this.directory = MiscTools.getFileDir(path);
       this.name = MiscTools.getFileName(path);
       this.extension = MiscTools.getFileExtname(path);
       this.createdBy = createdBy;
       this.autor = autor;
       this.dateCreated = dateCreated;
       this.dateModify = dateModify;
       this.tags = tags;
    }

    getId(){
        return this.id;
    }

    getPath(){
        return this.path;
    }

    getName(){
        return this.name;
    }

    getExtension(){
        return this.extension
    }

    getCreatedBy(){
        return this.createdBy
    }

    getAutor(){
        return this.autor;
    }

    getDateCreated(){
        return this.dateCreated;
    }

    getDateModify(){
        return this.dateModify;
    }

    getTags(){
        return this.tags;
    }

    setId(id: string){
        this.id = id;
    }

    setName(name:string){
        this.name = name;
    }

    setExtension(extension: string){
        this.extension = extension;
    }

    setAutor(autor: {id:string, name:string}){
        this.autor = autor;
    }

    setTags(tags: string[]){
        this.tags = tags;
    }

}