import { FileAbstract } from "./FileAbstract";

export class Theme extends FileAbstract{

    audio: HTMLAudioElement | undefined;
    reverseSrc: string;

    constructor(id: string,path:string,createdBy: string,autor:{id:string, name:string},dateCreated: number,dateModify: number,tags: string[], audio?: HTMLAudioElement, reverseSrc?: string){
        super(id,path,createdBy,autor,dateCreated,dateModify,tags);
        this.audio = (audio) ? audio : undefined;
        this.reverseSrc = (reverseSrc) ? reverseSrc : '';
    }

    static getEmptyTheme(): Theme{
        return new Theme('','','',{id:'',name:''},0,0,[]);
    }

}