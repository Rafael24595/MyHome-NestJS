export interface BarThemesListInterface{
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
}