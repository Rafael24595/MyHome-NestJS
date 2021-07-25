import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { user_config } from "../variables/Globals";

@Injectable()
export class MiscTools{

    videoFormats = ['mp4', 'avi'];
    audioFormats = ['mp3', 'wav'];
    imageFormats = ['png', 'jpg'];

    static decodeURIComponentFull(path:string): string{
        return decodeURIComponent(decodeURIComponent(path));
    }

    static isFile(path: string | undefined): boolean{
        return (path && path.split('.').length > 1) ? true : false;
    }

    typeFile(path:string){
        const extension = MiscTools.getFileExtname(path);
        if(this.videoFormats.indexOf(extension) != -1) return 'video';
        if(this.audioFormats.indexOf(extension) != -1) return 'audio';
        if(this.imageFormats.indexOf(extension) != -1) return 'image';
        return '';
    }

    static pathToQuery(path:string | undefined): string{
        return JSON.stringify(path?.split('/'));
    }

    static getFileExtname(path:string): string{
        if(MiscTools.isFile(path)){
            return path.split('.').pop()?.toLowerCase() as string;
        }
        return '';
    }

    static getChildPath(route: ActivatedRoute): string{
        const path = MiscTools.decodeURIComponentFull(location.pathname.toString());
        const parentPath = route.snapshot.routeConfig?.path;
        const regexPattern = `.*${parentPath}`;
        var regex = new RegExp(regexPattern);
        return path.replace(regex, '');
    }

    static formatBytes(bytes: number, decimals = 2): string {
        if (bytes === 0) return '0 Bytes';
    
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
        const i = Math.floor(Math.log(bytes) / Math.log(k));
    
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    static formatDate(date: number): string{
        let dateFormat = new Date(date).toLocaleString();
        return dateFormat;
    }

    static refreshPage(router: Router){
        const uri = router.url;
        router.navigate(['']);
        setTimeout(() => {
            router.navigate([uri]);
        }, 1);
        
    }

    static resetLastElement(path: string){
        if(path != user_config.lastElementId.pathParent){
          user_config.lastElementId.path = '';
          user_config.lastElementId.pathParent = '';
        }
    }
}