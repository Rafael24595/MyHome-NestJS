import { basename, extname, join } from "path";
import { PathVariables } from "./Variables";

export class AppUtils{

    basename(path: string): string{
       return basename(path).replace(/\..*/, '');
    }

    extname(path: string): string{
        return extname(path).replace(/\./, '');
    }

    cleanUrl(controller: string, url: string): string{
        let path: string = url.replace(`api/${controller}/`, '');
        path = path.replace(/\?.*/g, '');
        path = path.replace(/#.*/g, '');
        return path;
    }

    getCleanRelativePath(controller: string, url: string): string {
        const filePath = this.cleanUrl(controller, url);
        const relativePath = join(__dirname, PathVariables.private_assets_root , filePath);
        return relativePath;
    }
}