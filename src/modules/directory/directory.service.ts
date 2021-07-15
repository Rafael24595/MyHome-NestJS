import { Injectable } from '@nestjs/common';
import { readdirSync, statSync } from 'fs';
import { basename, extname, join } from 'path';
import { AppUtils } from 'src/utils/app.utils';
import { CreateDirectoryContentDTO } from './dto/directory.dto';
import { DirectoryContent } from './interfaces/directory.interface';
import { DirectoryUtils } from './utils/directory.utils';

@Injectable()
export class DirectoryService {

    constructor(private directoryUtils: DirectoryUtils, private appUtils: AppUtils){}

    async getDirectoryContent(filePath: string, isRoot: boolean): Promise<CreateDirectoryContentDTO[]>{
        
        const files = readdirSync(filePath);
        let dirContent:DirectoryContent[] = []

        if(!isRoot){
            dirContent.push(this.directoryUtils.getDirectoryParent(filePath));
        }

        for (let index = 0; index < files.length; index++) {
            const absolutePath = join(filePath, files[index]);
            const item = await this.directoryUtils.getDirectory(absolutePath);
            
            dirContent.push(item);  
        }

        return dirContent;
    }

}
