import { Theme } from "src/classes/File/Theme";
import { BarThemesListInterface } from "../interfaces/theme-list.interface";

export class BarUtils{

    public static positionInBar(cuersorPosition:number, item:HTMLElement | null){
      let overflow = 
      (item) 
        ? (Math.sign(item.getBoundingClientRect().x) < 0) 
          ? Math.abs(item.getBoundingClientRect().x) 
          : item.getBoundingClientRect().x * -1
        : 0 ;
      return cuersorPosition + overflow;
    }

    public static randomizeList(themesList:Theme[],position:number){
        let randomList:Theme[] = [];
        let themeListTransition:Theme[] = this.copyArray(themesList) as Theme[];
        randomList.push(themeListTransition[position]);
        themeListTransition.splice(position, 1);
        while(themeListTransition.length > 0){
          let random = Math.floor(Math.random() * themeListTransition.length);
          if(random < themeListTransition.length){
            randomList.push(themeListTransition[random]);
            themeListTransition.splice(random, 1);
          }
        }
        return randomList;
      }

      public static findThemePositionInListById(themesListActive:BarThemesListInterface[],position:number,themesList:BarThemesListInterface[]){
        let actualId = themesListActive[position].id;
        let index = -1;
        themesList.find(theme=>{ index++; return (theme.id == actualId)})
        return index;
      }

      public static findThemePositionInListByPath(theme: Theme, themeList: Theme[]): number{
        let count = 0;
        while (count < themeList.length){
          if(theme.path == themeList[count].path){
            return count;
          }
          count = count + 1; 
        }
        return -1;
      }

      public static copyArray(array:object[]): object[]{
        let arrayCopy:object[] = [];
        for (const obj of array) {
          arrayCopy.push(obj);
        }
        return arrayCopy
      }

      public static getSeconds(time:number): string{
        let second:number | string = Math.floor((time * 1000 % (1000 * 60)) / 1000);
        let minute:number | string = Math.floor((time * 1000 % (1000 * 60 * 60)) / (1000 * 60));
        second = (second >= 0) ? second : 0;
        minute = (minute >= 0) ? minute : 0;
        second = (second.toString().length > 1) ? second : `0${second}`;
        minute = (minute.toString().length > 1) ? minute : `0${minute}`;
    
        return minute + ':' + second;
      }

      public static calculeTimeByPixel(audio: HTMLAudioElement, position:number, size: number): number{
          let timeTotal = audio.duration
          return position * timeTotal / size;
      }

      public static calculeTimeBySeconds(audio: HTMLAudioElement, size: number, position?:number): number{
          let timeActual = (position) ? position : audio.currentTime;
          let timeTotal = audio.duration;
          return timeActual * size / timeTotal;
      }

}