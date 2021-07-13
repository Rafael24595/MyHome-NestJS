export class Path{

    abpath: string;
    directory: boolean;
    name: string;
    extension: string;
    size: number;
    content: {directoty: number, file: number};
    birthtime: number;
    modtime: number;
    metadata: boolean;
    back: boolean;

    constructor(abpath: string,directory: boolean,name: string,extension: string,size: number, content: {directoty: number, file: number}, birthtime: number,modtime: number,metadata: boolean, back: boolean){
        this.abpath = abpath;
        this.directory = directory;
        this.name = name;
        this.extension = extension;
        this.size = size;
        this.content = content;
        this.birthtime = birthtime;
        this.modtime = modtime;
        this.metadata = metadata;
        this.back = back;
    }

}