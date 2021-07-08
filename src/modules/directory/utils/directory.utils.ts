import { Injectable } from "@nestjs/common";
import { readdirSync, statSync } from "fs";
import { join } from "path";
import { AppUtils } from "src/utils/app.utils";
import { DirectoryContent } from "../interfaces/directory.interface";

@Injectable()
export class DirectoryUtils{

  constructor(private appUtils: AppUtils){}

    async getTotalContentSize(contentPath: string): Promise<number> {

        let arrayOfFiles = [];
        let totalSize = 0

        if (statSync(contentPath).isDirectory()) {
            arrayOfFiles = await this.getAllFiles(contentPath);
        }
        else{
            arrayOfFiles.push(contentPath)
        }
      
        arrayOfFiles.forEach( (filePath: string) => {
          totalSize += statSync(filePath).size;
        })
      
        return totalSize;
      }

      async getAllFiles(contentPath: string, arrayOfFiles?: string[]): Promise<string[]> {
        const files = readdirSync(contentPath)
      
        arrayOfFiles = arrayOfFiles || []
      
        files.forEach(async file =>{
          if (statSync(contentPath + "/" + file).isDirectory()) {
            arrayOfFiles = await this.getAllFiles(contentPath + "/" + file, arrayOfFiles)
          } else {
            arrayOfFiles.push(join(contentPath, file))
          }
        })
      
        return arrayOfFiles
      }

      async getDirectory(absolutePath: string){

        const fileStat = statSync(absolutePath); 

        const item = {
          abpath: absolutePath,
          directory: fileStat.isDirectory(),
          name: this.appUtils.basename(absolutePath),
          extension: this.appUtils.extname(absolutePath),
          size: await this.getTotalContentSize(absolutePath),
          birthtime: fileStat.birthtimeMs,
          modtime: fileStat.mtimeMs,
          metadata: true,
          return: false
        }

        return item;
      }

      getDirectoryParent(filePath:string): DirectoryContent{

        const absolutePath = this.appUtils.pathParent(filePath);

        const item = {
            abpath: absolutePath,
            directory: true,
            name: this.appUtils.basename(absolutePath),
            extension: '',
            size: 0,
            birthtime:0,
            modtime: 0,
            metadata: false,
            return: true
        }
        
        return item;
    }

}