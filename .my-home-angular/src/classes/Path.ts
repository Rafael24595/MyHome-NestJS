
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

    static getEmptyPath(): Path{
        return new Path('', false, '', '', 0, {directoty: 0, file: 0}, 0, 0, false, false);
    }

    static getParentDirectory(path: string): Path{
        let pathArray = path.split('/');
        pathArray.pop();
        const parentPath = pathArray.join('/');
        pathArray.pop();
        const name = pathArray.pop() as string;
        return new Path(parentPath, true, name, '', 0, {directoty: 0, file: 0}, 0, 0, false, true);
    }

}