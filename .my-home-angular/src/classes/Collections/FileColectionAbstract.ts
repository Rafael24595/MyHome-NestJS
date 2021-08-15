import { Gallery } from "./Gallery";
import { PlayListMusic } from "./PlayListMusic";
import { PlayListVideo } from "./PlayListVideo";

export class FileCollectionAbstract{

    name:string;
    owner: string;
    userView:boolean;
    userManage:boolean;
    privateState:boolean;
    systemList: boolean;
    path: string;
    image: string;
    location?: string | undefined;
    total?: number;
    position?: number;

    constructor(name:string, owner: string, userView:boolean, userManage:boolean, privateState:boolean, systemList: boolean, path: string, location?: string, image?: string, total?: number, position?:number){
        this.name = name;
        this.owner = owner;
        this.userView = userView;
        this.userManage = userManage;
        this.privateState = privateState;
        this.systemList = systemList;
        this.path = path;
        this.location = location;
        this.image = (image) ? image : 'defaultSrc'; 
        this.total = total;
        this.position = position;
    }

}
