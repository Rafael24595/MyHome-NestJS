import { Injectable } from "@nestjs/common";
import { extname } from "path";
import { AppUtils } from "src/utils/app.utils";

@Injectable()
export class FileUtils {
    
    imageFormats = ['png', 'jpg'];

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

    typeFile(path:string):boolean{
        const extension = this.appUtils.extname(path);
        return (this.imageFormats.indexOf(extension) != -1);
    }

}