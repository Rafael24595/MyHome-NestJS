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

    async getDirectoryContent(filePath: string): Promise<CreateDirectoryContentDTO[]>{

        const files = readdirSync(filePath);console.log(files)
        let dirContent:DirectoryContent[] = []

        for (let index = 0; index < files.length; index++) {
            
            const absolutePath = join(filePath, files[index]);
            const fileStat = statSync(absolutePath); 

            const item = {
                abpath: absolutePath,
                directory: fileStat.isDirectory(),
                name: this.appUtils.basename(absolutePath),
                extension: this.appUtils.extname(absolutePath),
                size: await this.directoryUtils.getTotalContentSize(absolutePath),
                birthtime: fileStat.birthtimeMs,
                modtime: fileStat.mtimeMs
            }
            
            dirContent.push(item);
            
        }

        return dirContent;
    }

}
