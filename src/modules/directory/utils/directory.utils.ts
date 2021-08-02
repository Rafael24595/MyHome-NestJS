import { Injectable } from "@nestjs/common";
import { readdirSync, statSync } from "fs";
import { join } from "path";
import { FileUtils } from "src/modules/file/utils/file.utils";
import { AppUtils } from "src/utils/app.utils";
import { DirectoryContent } from "../interfaces/directory.interface";

@Injectable()
export class DirectoryUtils{

  constructor(private appUtils: AppUtils, private fileUtils:FileUtils){}

    rootDirectory = 'private_assets';

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
        });
      
        return totalSize;
      }

      async getAllFiles(contentPath: string, arrayOfFiles?: string[]): Promise<string[]> {
        const files = readdirSync(contentPath);
      
        arrayOfFiles = arrayOfFiles || []
      
        files.forEach(async file =>{
          if (statSync(contentPath + "/" + file).isDirectory()) {
            arrayOfFiles = await this.getAllFiles(contentPath + "/" + file, arrayOfFiles)
          } else {
            arrayOfFiles.push(join(contentPath, file))
          }
        });
        return arrayOfFiles;
      }

      async getDirectoryFiles(contentPath: string): Promise<string[]> {
        let arrayOfFiles = [];
        
        if (statSync(contentPath).isDirectory()){

          arrayOfFiles = readdirSync(contentPath);

          for (let index = 0; index < arrayOfFiles.length; index++) {
            arrayOfFiles[index] = join(contentPath,arrayOfFiles[index]);
          }

        }

        return arrayOfFiles;
      }

      async getFilesType(contentPath: string): Promise<{ directory: number; file: number; }>{
        const arrayOfFiles = await this.getDirectoryFiles(contentPath);
        let categories = {
          directory: 0,
          file: 0
        }

        arrayOfFiles.forEach(async file=>{
          if (statSync(file).isDirectory())
            categories.directory = categories.directory + 1;
          else
          categories.file = categories.file + 1;
        });

        return categories;
      }

      simplifyPath(absolutePath: string){
        const regexPattern = `.*${this.rootDirectory}`;
        const regex = new RegExp(regexPattern,"g");
        return absolutePath.replace(regex, '').replace(/\\/g, '/');
      }

      async getDirectory(absolutePath: string){

        const fileStat = statSync(absolutePath);

        const item: DirectoryContent = {
          abpath: this.simplifyPath(absolutePath),
          directory: fileStat.isDirectory(),
          name: this.appUtils.basename(absolutePath),
          extension: this.appUtils.extname(absolutePath),
          type: this.fileUtils.typeFile(absolutePath),
          size: await this.getTotalContentSize(absolutePath),
          content: await this.getFilesType(absolutePath),
          birthtime: fileStat.birthtimeMs,
          modtime: fileStat.mtimeMs,
          metadata: true,
          back: false
        }

        return item;
      }

      getDirectoryParent(filePath:string): DirectoryContent{

        const absolutePath = this.simplifyPath(this.appUtils.pathParent(filePath));
        const name = (this.appUtils.basename(absolutePath) == '') ? 'root' : this.appUtils.basename(absolutePath);

        const item: DirectoryContent = {
            abpath: absolutePath,
            directory: true,
            name: name,
            extension: '',
            type:'',
            size: 0,
            content: {directory:0, file:0},
            birthtime:0,
            modtime: 0,
            metadata: false,
            back: true
        }
        
        return item;
    }

}