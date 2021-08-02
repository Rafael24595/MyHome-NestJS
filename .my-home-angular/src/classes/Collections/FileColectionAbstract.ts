
export class FileCollectionAbstract{

    name:string;
    owner: string;
    userView:boolean;
    userManage:boolean;
    privateState:boolean;
    systemList: boolean;
    path: string;
    image: string;

    constructor(name:string, owner: string, userView:boolean, userManage:boolean, privateState:boolean, systemList: boolean, path: string, image?: string){
        this.name = name;
        this.owner = owner;
        this.userView = userView;
        this.userManage = userManage;
        this.privateState = privateState;
        this.systemList = systemList;
        this.path = path;
        this.image = (image) ? image : 'defaultSrc'; 
    }

}
