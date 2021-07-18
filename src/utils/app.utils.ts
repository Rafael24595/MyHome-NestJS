import { statSync } from "fs";
import { basename, extname, join } from "path";
import { PathVariables } from "./Variables";
import * as CryptoJS from 'crypto-js';

export class AppUtils{

    basename(path: string): string{
       return basename(path).replace(/\..*/, '');
    }

    extname(path: string): string{
        return extname(path).replace(/\./, '').toLowerCase();
    }

    pathParent(path: string){
        return join(path , '..');
    }

    cleanUrl(controller: string, url: string): string{
        let path: string = url.replace(`/api/${controller}/`, '');
        path = path.replace(/\?.*/g, '');
        path = path.replace(/#.*/g, '');
        return path;
    }

    isRoot(controller: string, url: string): boolean{
        return (this.cleanUrl(controller, url) == '');
    }

    getCleanRelativePath(controller: string, url: string): string {
        const filePath = this.cleanUrl(controller, url);
        const relativePath = decodeURIComponent(join(PathVariables.private_assets_root , filePath));
        return relativePath;
    }

    getFileHash(path: string): string{
        const metadata = statSync(path);
        const size = metadata.size;
        const date = metadata.birthtimeMs;
        const fileHash = CryptoJS.MD5(`${path}-${size}-${date}`).toString();
        
        return fileHash;
    }
}