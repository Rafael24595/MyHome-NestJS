import { ActivatedRoute } from "@angular/router";
import { FileCollectionAbstract } from "src/classes/Collections/FileColectionAbstract";
import { Gallery } from "src/classes/Collections/Gallery";
import { PlayListMusic } from "src/classes/Collections/PlayListMusic";
import { PlayListVideo } from "src/classes/Collections/PlayListVideo";
import { Theme } from "src/classes/File/Theme";
import { MiscTools } from "./misc.tools";

export class CollectionTools{

    public static getCollectionPathData(route: ActivatedRoute): {path: string, owner: string | undefined, name: string | undefined, list: string | undefined}{
        const path = MiscTools.getChildPath(route).replace(/\//, '');
        const pathData = path.split('/');
        const owner = (pathData[0]) ? pathData[0] : undefined;
        const name = (pathData[1]) ? pathData[1] : undefined;
        const list = (pathData[2]) ? pathData[2] : undefined;
        return {path, owner, name, list};
    }

    public static findCollectionPosition(collections: Gallery[] | PlayListMusic[] | PlayListVideo[] | FileCollectionAbstract[], collectionName: string): number{
        const map = collections.map((element:Gallery | PlayListMusic | PlayListVideo | FileCollectionAbstract)=>{return element.name});
        return map.indexOf(collectionName);
    }

    public static getCollectionByName(collectionList: Gallery[] | PlayListMusic[] | PlayListVideo[] | FileCollectionAbstract[], name: string):Gallery |PlayListMusic | PlayListVideo | undefined {
        const position = CollectionTools.findCollectionPosition(collectionList, name);
        let collection;

        console.log(collectionList[0] instanceof PlayListMusic)

        if(collectionList[0] instanceof Gallery){
            collection = collectionList[position] as Gallery;
        }
        if(collectionList[0] instanceof PlayListMusic){
            collection = collectionList[position] as PlayListMusic;
            collection.list = Theme.interfaceToTheme(collection.list);
        }
        if(collectionList[0] instanceof PlayListVideo){
            collection = collectionList[position] as PlayListVideo;
        }

        return collection;
    }

}