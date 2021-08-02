export interface CollectionElement{
    id: string;
    path:string;
    autor:{id:string, name:string};
    dateCreated: number;
    dateModify: number;
    tags: string[];
}