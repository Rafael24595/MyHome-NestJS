
export class Path{

    abpath: string;
    directory: boolean;
    name: string;
    extension: string;
    size: number;
    type: string;
    content: {directory: number, file: number};
    birthtime: number;
    modtime: number;
    metadata: boolean;
    back: boolean;

    constructor(abpath: string,directory: boolean,name: string,extension: string, size: number, type:string, content: {directory: number, file: number}, birthtime: number,modtime: number,metadata: boolean, back: boolean){
        this.abpath = abpath;
        this.directory = directory;
        this.name = name;
        this.extension = extension;
        this.size = size;
        this.type = type;
        this.content = content;
        this.birthtime = birthtime;
        this.modtime = modtime;
        this.metadata = metadata;
        this.back = back;
    }

    static getEmptyPath(): Path{
        return new Path('', false, '', '', 0, '' , {directory: 0, file: 0}, 0, 0, false, false);
    }

    static getParentDirectory(path: string): Path{console.log(path)
        let pathArray = path.split('/');
        pathArray.pop();
        const parentPath = pathArray.join('/');
        const name = pathArray.pop();
        return new Path(parentPath, true, (name) ? name : 'root', '', 0, '', {directory: 0, file: 0}, 0, 0, false, true);
    }

}