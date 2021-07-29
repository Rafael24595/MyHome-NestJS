import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Theme } from "src/classes/File/Theme";

@Injectable({
    providedIn: 'root'
})

export class ProgressBarListener{

    themeList: Theme[] | undefined;
    private sendThemeListSubject = new Subject<Theme[]>();
    themeListObservable = this.sendThemeListSubject.asObservable();

    unsubscribe(){
        this.sendThemeListSubject.next();
        this.sendThemeListSubject = new Subject<Theme[]>();
        this.themeListObservable = this.sendThemeListSubject.asObservable();
    }

    sendThemeList(themeList:Theme[]){
        this.themeList = themeList;
        this.sendThemeListSubject.next(themeList);
    }

}