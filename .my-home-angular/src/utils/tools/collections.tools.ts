import { ActivatedRoute } from "@angular/router";
import { FileCollectionAbstract } from "src/classes/Collections/FileColectionAbstract";
import { Gallery } from "src/classes/Collections/Gallery";
import { PlayListMusic } from "src/classes/Collections/PlayListMusic";
import { PlayListVideo } from "src/classes/Collections/PlayListVideo";
import { Picture } from "src/classes/File/Picture";
import { Theme } from "src/classes/File/Theme";
import { MiscTools } from "./misc.tools";

export class CollectionTools{

    public static getCollectionPathData(route: ActivatedRoute): {path: string, owner: string | undefined, name: string | undefined, list: string | undefined}{
        const path =  MiscTools.cleanUrl(MiscTools.getChildPath(route).replace(/\//, ''));
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

        if(collectionList[0] instanceof Gallery){
            collection = collectionList[position] as Gallery;
        }
        if(collectionList[0] instanceof PlayListMusic){
            collection = collectionList[position] as PlayListMusic;
        }
        if(collectionList[0] instanceof PlayListVideo){
            collection = collectionList[position] as PlayListVideo;
        }

        return collection;
    }

    public static collectionListInterfaceToList(collection: Gallery | PlayListMusic | PlayListVideo, path: string, type: string, scrollFunct?: Function): Gallery | PlayListMusic | PlayListVideo{

        let panel = document.getElementById('body');

        /*if(panel){
            panel.onscroll = null;
        }*/

        switch (type){

            case 'image':
                collection = Gallery.interfaceToGallery(collection as Gallery, path);
                collection.list = Picture.interfaceToPicture(collection.list);
                if(scrollFunct && panel){
                    panel.onscroll = ()=>{
                        scrollFunct();
                    };
                }
            break;

            case 'audio':
                collection = PlayListMusic.interfaceToPlayList(collection as PlayListMusic, path);
                collection.list = Theme.interfaceToTheme(collection.list);
            break;

            case 'video':
                collection = collection as PlayListVideo;
            break;

        }

       return collection;
   }

   static getType(collection: Gallery | PlayListMusic | PlayListVideo): string{
        if(collection instanceof Gallery) return 'image';
        if(collection instanceof PlayListMusic) return 'audio';
        if(collection instanceof PlayListVideo) return 'video';
        return '';
    }

    public static updateCollectionPage(collection: Gallery | PlayListMusic | PlayListVideo, list: Theme[] | Picture[], position: number | undefined): Gallery | PlayListMusic | PlayListVideo{
        list = collection.list.concat(list as any);
        collection.list = list;
        collection.position = position;
        return collection;
    }

}