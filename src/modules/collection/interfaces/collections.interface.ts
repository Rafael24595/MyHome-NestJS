export interface Collection{
    location: string;
    name:string;
    owner: string;
    userView:boolean;
    userManage:boolean;
    privateState:boolean;
    systemList: boolean;
    list: object[];
    total?: number;
    position?: number;
}