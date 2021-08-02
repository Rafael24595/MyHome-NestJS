export interface DirectoryContent{
    abpath: string;
    directory: boolean;
    name: string;
    extension: string;
    type: string;
    size: number;
    content: {directory: number, file: number}
    birthtime: number;
    modtime: number;
    metadata: boolean;
    back: boolean
}