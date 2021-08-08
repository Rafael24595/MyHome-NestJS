import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Theme } from "src/classes/File/Theme";

@Injectable({
    providedIn: 'root'
})

export class ProgressBarListener{

    themeList: ProgressBarData | undefined;
    private sendThemeListSubject = new Subject<ProgressBarData>();
    themeListObservable = this.sendThemeListSubject.asObservable();

    unsubscribe(){
        this.sendThemeListSubject.next();
        this.sendThemeListSubject = new Subject<ProgressBarData>();
        this.themeListObservable = this.sendThemeListSubject.asObservable();
    }

    sendThemeList(themeList:ProgressBarData){
        this.themeList = themeList;
        this.sendThemeListSubject.next(themeList);
    }

}

export interface ProgressBarData{
    list:Theme[],
    collection?: string | undefined,
    settings?: ProgressBarRepSettings
}

export interface ProgressBarRepSettings{
    random: boolean
}