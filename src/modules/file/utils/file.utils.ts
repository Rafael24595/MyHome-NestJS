import * as genThumbnail from 'simple-thumbnail';
import { Injectable } from "@nestjs/common";
import { AppUtils } from "src/utils/app.utils";
import { join } from 'path';

@Injectable()
export class FileUtils {
    
    videoFormats = ['mp4', 'avi'];
    audioFormats = ['mp3', 'wav'];
    imageFormats = ['png', 'jpg', 'gif'];

    constructor(private appUtils: AppUtils){}
    
    setStart(range: string): number{
        const start = Number(range.replace(/\D/g, ""));
        return start;
    }

    setEnd(start:number, videoSize:number): number{
        const CHUNK_SIZE = 10 ** 6; // 1MB
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
        return end
    }

    setHeaders(start:number, end:number, videoSize:number): Object{
        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
        };
        return headers;
    }

    isImage(path:string):boolean{
        const extension = this.appUtils.extname(path);
        return (this.imageFormats.indexOf(extension) != -1);
    }

    typeFile(path:string):string{
        const extension = this.appUtils.extname(path);
        if(this.videoFormats.indexOf(extension) != -1) return 'video';
        if(this.audioFormats.indexOf(extension) != -1) return 'audio';
        if(this.imageFormats.indexOf(extension) != -1) return 'image';
        return 'other';
    }

    async generateThumbnail(filePath: string, thumbnailPath:string): Promise<void>{
        try {
            await genThumbnail(join(filePath), thumbnailPath, '150x?')
        } catch (err) {
            console.error(err)
        }
    }

}