import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Injectable()
export class MiscTools{

    videoFormats = ['mp4', 'avi'];
    audioFormats = ['mp3', 'wav'];
    imageFormats = ['png', 'jpg'];

    decodeURIComponentFull(path:string): string{
        return decodeURIComponent(decodeURIComponent(path));
    }

    isFile(path: string | undefined): boolean{
        return (path && path.split('.').length > 1) ? true : false;
    }

    typeFile(path:string){
        const extension = this.getFileExtname(path);
        if(this.videoFormats.indexOf(extension) != -1) return 'video';
        if(this.audioFormats.indexOf(extension) != -1) return 'audio';
        if(this.imageFormats.indexOf(extension) != -1) return 'image';
        return '';
    }

    pathToQuery(path:string | undefined): string{
        return JSON.stringify(path?.split('/'));
    }

    getFileExtname(path:string): string{
        if(this.isFile(path)){
            return path.split('.').pop()?.toLowerCase() as string;
        }
        return '';
    }

    getChildPath(route: ActivatedRoute): string{
        const path = this.decodeURIComponentFull(location.pathname.toString());console.log(path)
        const parentPath = route.snapshot.routeConfig?.path;console.log(parentPath)
        const regexPattern = `.*${parentPath}`;
        var regex = new RegExp(regexPattern);console.log(path.replace(regex, ''))
        return path.replace(regex, '');
    }
}