import { readdirSync, statSync } from "fs";
import { join } from "path";

export class DirectoryUtils{

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

}