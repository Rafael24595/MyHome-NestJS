
export class FileCollectionAbstract{

    name:string;
    userView:boolean;
    userManage:boolean;
    privateState:boolean;
    hotList: boolean;

    constructor(name:string, userView:boolean, userManage:boolean, privateState:boolean, hotList: boolean){
        this.name = name;
        this.userView = userView;
        this.userManage = userManage;
        this.privateState = privateState;
        this.hotList = hotList;
    }

}
