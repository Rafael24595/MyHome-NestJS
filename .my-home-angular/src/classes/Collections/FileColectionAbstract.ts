import { FileAbstract } from "../File/FileAbstract";

export class FileCollectionAbstract{

    name:string;
    owner: string;
    userView:boolean;
    userManage:boolean;
    privateState:boolean;
    systemList: boolean;
    path: string;
    image: string;
    list: FileAbstract[];
    location?: string | undefined;
    total?: number;
    position?: number;
    searchParam?: string;

    constructor(name:string, owner: string, userView:boolean, userManage:boolean, privateState:boolean, systemList: boolean, path: string, list: FileAbstract[], location?: string, image?: string, total?: number, position?:number, searchParam?:string){
        this.name = name;
        this.owner = owner;
        this.userView = userView;
        this.userManage = userManage;
        this.privateState = privateState;
        this.systemList = systemList;
        this.path = path;
        this.list = list;
        this.location = location;
        this.image = (image) ? image : 'defaultSrc'; 
        this.total = total;
        this.position = position;
        this.searchParam = (searchParam) ? searchParam : '';
    }

    getSearchCoincidenceLength(): number{
        let count = 0;
        this.list.forEach(element=>{
            if(element.getSearchCoincidence())
                count = count + 1
        });
        return count;
    }

    genericSearch(param: string): void{
        this.cleanSearch();
        if(param != ''){
            param=param.toLowerCase();
            this.list.forEach(element=>{
                const name = element.getName().toLowerCase();
                const author = element.getAutor().name.toLowerCase();
                let coincidence = name.includes(param) || author.includes(param);
                if(!coincidence){
                    element.setSearchCoincidence(false);
                }
            });
            this.searchParam = param;
        }
        
    }

    cleanSearch(): void{
        this.list.forEach(element=>{
            element.setSearchCoincidence(true);
        });
        this.searchParam = '';
    }

}
