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

    async getSystemCollections(path:string, type: string, collectionList?:CreateCollectionDTO[]): Promise<CreateCollectionDTO[]>{

        try {
            const files = readdirSync(path);
            const name = this.appUtils.basename(path);
            const simplifyPath = this.directoryUtils.simplifyPath(path);
            let collection = this.createEmptyCollection(simplifyPath, name, 'system', true, false, false, true);
            let validFiles = 0;
            let cont = 0;

            collectionList = collectionList || [];

            while(cont < files.length){
                const file = files[cont];
                const elementPath = `${path}/${file}`;
                if (statSync(elementPath).isDirectory()) {
                    collectionList = await this.getSystemCollections(elementPath, type, collectionList);
                } else {
                    validFiles = (this.fileUtils.typeFile(elementPath) == type) ? validFiles + 1 : validFiles;
                }
                cont = cont + 1;
            }

            /*let cont = 1;
            files.forEach(async file=>{
                const elementPath = `${path}/${file}`;
                if (statSync(elementPath).isDirectory()) {
                    collectionList = await this.getSystemCollections(elementPath, type, collectionList);
                } else {
                    const filePath = this.directoryUtils.simplifyPath(elementPath);
                    const collectionElement = this.createCollectionElement(`${name}-${cont}`, filePath, {id: 'system-001', name: 'system'}, 0, 0, []);
                    if(this.fileUtils.typeFile(elementPath) == type){
                        collection.list.push(collectionElement);
                        cont = cont + 1;
                    }
                }
            });*/
            
            if(validFiles > 0) collectionList.push(collection);

            return collectionList;
        } catch (error) {
            console.error(error);
            return [];
        }

    }

    async getSystemCollectionAll(path:string, type: string): Promise<CreateCollectionDTO>{

        const files = readdirSync(path);
        const name = this.appUtils.basename(path);
        let collection = this.createEmptyCollection(path, name, 'system', true, false, false, true, files.length, files.length);

        try {
            for (let index = 0; index < files.length; index++) {
                const elementPath = `${path}/${files[index]}`;
                const filePath = this.directoryUtils.simplifyPath(elementPath);
                const collectionElement = this.createCollectionElement(`${name}-${index}`, filePath, {id: 'system-001', name: 'system'}, 0, 0, []);
                if(this.fileUtils.typeFile(elementPath) == type){
                    collection.list.push(collectionElement);
                }
            }

        } catch (error) {
            console.error(error);
        }

        return collection;

    }

    async getSystemCollectionPage(path:string, type: string, position: number): Promise<CreateCollectionDTO>{

        const files = readdirSync(path);
        const name = this.appUtils.basename(path);
        let collection = this.createEmptyCollection(this.directoryUtils.simplifyPath(path), name, 'system', true, false, false, true, files.length, position);

        try {
            
            let numId = position;
            let cont = position;

            while(numId < position + 30 && cont < files.length){
                const elementPath = `${path}/${files[cont]}`;
                const filePath = this.directoryUtils.simplifyPath(elementPath);
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

            collection.position = cont;

        } catch (error) {
            console.error(error);
        }

        return collection;

    }

    createCollection(location: string, name:string,owner:string,userView:boolean,userManage:boolean,privateState:boolean,systemList:boolean,list:object[]): Collection{
        return {location,name,owner,userView,userManage,privateState,systemList,list};
    }

    createEmptyCollection(location: string,name:string,owner:string,userView:boolean,userManage:boolean,privateState:boolean,systemList:boolean,total?:number,position?:number): Collection{
        return {location,name,owner,userView,userManage,privateState,systemList,list:[], total, position};
    }

    createCollectionElement(id:string,path:string,autor:{id:string, name:string},dateCreated:number,dateModify:number,tags: string[]):CollectionElement{
        return {id,path,autor,dateCreated,dateModify,tags}
    }

}