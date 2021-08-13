export interface Collection{
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