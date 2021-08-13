import { Injectable } from "@nestjs/common";
import { readdirSync, statSync } from "fs";
import { DirectoryUtils } from "src/modules/directory/utils/directory.utils";
import { FileUtils } from "src/modules/file/utils/file.utils";
import { AppUtils } from "src/utils/app.utils";
import { CreateCollectionDTO } from "../dto/collection.dto";
import { CollectionElement } from "../interfaces/collection-element.interface";
import { Collection } from "../interfaces/collections.interface";

@Injectable()
export class CollectionUtils{

    constructor(private appUtils: AppUtils, private directoryUtils: DirectoryUtils, private fileUtils: FileUtils){}

    async getSystemCollection(path:string, type: string, collectionList?:CreateCollectionDTO[]): Promise<CreateCollectionDTO[]>{

        try {
            const files = readdirSync(path);
            const name = this.appUtils.basename(path);
            let collection = this.createEmptyCollection(name, 'system', true, false, false, true);
            let cont = 1;

            collectionList = collectionList || [];

            files.forEach(async file=>{
                const elementPath = `${path}/${file}`;
                if (statSync(elementPath).isDirectory()) {
                    collectionList = await this.getSystemCollection(elementPath, type, collectionList);
                } else {
                    const filePath = this.directoryUtils.simplifyPath(elementPath);
                    const collectionElement = this.createCollectionElement(`${name}-${cont}`, filePath, {id: 'system-001', name: 'system'}, 0, 0, []);
                    if(this.fileUtils.typeFile(elementPath) == type){
                        collection.list.push(collectionElement);
                        cont = cont + 1;
                    }
                }
            });

            if(collection.list.length > 0) collectionList.push(collection);

            return collectionList;
        } catch (error) {
            console.error(error);
            return [];
        }

    }

    async getSystemCollectionPage(path:string, type: string, position: number): Promise<CreateCollectionDTO>{

        const files = readdirSync(path);
        const name = this.appUtils.basename(path);
        let collection = this.createEmptyCollection(name, 'system', true, false, false, true, files.length, position);

        try {
            
            let numId = position;
            let cont = position;

            while(numId < position + 30 && cont < files.length){
                const elementPath = `${path}/${files[cont]}`;
                const filePath = this.directoryUtils.simplifyPath(elementPath);console.log(filePath, cont)
                const collectionElement = this.createCollectionElement(`${name}-${numId}`, filePath, {id: 'system-001', name: 'system'}, 0, 0, []);
                if(this.fileUtils.typeFile(elementPath) == type){
                    collection.list.push(collectionElement);
                    numId = numId + 1;
                }
                else{
                    console.error(filePath)
                }
                cont = cont + 1;
            }

            position = cont;

        } catch (error) {
            console.error(error);
        }

        return collection;

    }

    creatCollection(name,owner,userView,userManage,privateState,systemList, list): Collection{
        return {name, owner,userView,userManage,privateState,systemList,list};
    }

    createEmptyCollection(name,owner,userView,userManage,privateState,systemList,  total?: number, position?: number): Collection{
        return {name, owner,userView,userManage,privateState,systemList,list: [], total, position};
    }

    createCollectionElement(id:string,path:string,autor:{id:string, name:string},dateCreated:number,dateModify:number,tags: string[]):CollectionElement{
        return {id,path,autor,dateCreated,dateModify,tags}
    }

}