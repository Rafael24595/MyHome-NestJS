import { Injectable } from "@nestjs/common";
import { PathVariables } from "src/utils/variables/Variables";
import { CreateCollectionDTO } from "./dto/collection.dto";
import { CollectionUtils } from "./utils/collection.utils";

@Injectable()
export class CollectionService {

    constructor(private collectionUtils: CollectionUtils){}

    async getSystemCollectionsByType(type: string): Promise<CreateCollectionDTO[]>{
        let path: string;

        switch (type){
            case 'audio': path = PathVariables.collections_audio; break;
            case 'image': path = PathVariables.collections_image; break;
            case 'video': path = PathVariables.collections_video; break;
            default: break;
        }

        let dirContent:CreateCollectionDTO[] = await this.collectionUtils.getSystemCollection(path, type);

        return dirContent;
    }

    async getSystemCollectionsPage(path: string, type: string, position: number): Promise<CreateCollectionDTO>{
        let collection:CreateCollectionDTO = await this.collectionUtils.getSystemCollectionPage(path, type, position);
        return collection;
    }

}