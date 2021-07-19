import { Injectable } from "@nestjs/common";
import { statSync, unlink, unlinkSync } from "fs";
import { scheduleJob } from "node-schedule";
import { DirectoryUtils } from "src/modules/directory/utils/directory.utils";
import { LifeTime, PathVariables } from "./Variables";

@Injectable()
export class Shedule{

    static instance: Shedule;

    constructor(private directoryUtils: DirectoryUtils){
        Shedule.instance = this;
    }

    static thumbnailControl(){
        const time = '0 */12 * * *';
        scheduleJob(time, Shedule.instance.cleanThumbnailDirectory.bind(Shedule.instance));
    }

    async cleanThumbnailDirectory():Promise<{ status: boolean; message: string; }> {
        const fileArray = await this.directoryUtils.getDirectoryFiles(PathVariables.tmp_thumbnails);
        fileArray.forEach(file=>{
            const birthtime = statSync(file).birthtimeMs;
            const currentDate = Date.now();
            const maxLifeTime = LifeTime.thumbnail + birthtime;
            if(currentDate >= maxLifeTime){
                try {
                    unlinkSync(file);
                } catch (err) {
                    console.error(err)
                }
            }
        });
        return
    }

}