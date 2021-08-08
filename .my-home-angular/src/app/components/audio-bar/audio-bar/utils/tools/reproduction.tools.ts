import { AudioBarComponent } from "../../audio-bar.component";
import { LocalStorage } from "../variables/storage.const";
import { BarUtils } from "./audio-bar.tools";
import { MiscToolsProgress } from "./misc.tools";
import { OperationsTools } from "./operations.tools";
import { ViewTools } from "./view.tools";
import { Theme } from "src/classes/File/Theme";

export class ReproductionTools{

    public static randomList = false;
    public static loopList = false;

    public static loopListReproduction(){
        ReproductionTools.loopList = !ReproductionTools.loopList;
        ViewTools.setLoopList();
        MiscToolsProgress.setLocalStorage(LocalStorage.loop_list_status, ReproductionTools.loopList);
      }
    
      public static loopAudio(){
        if(OperationsTools.theme.audio){
            OperationsTools.theme.audio.loop = !OperationsTools.theme.audio.loop;
            ViewTools.setLoopAudio();
            MiscToolsProgress.setLocalStorage(LocalStorage.loop_status, OperationsTools.theme.audio.loop);
        }
      }

    public static randomReproduction(){
        ReproductionTools.randomList = !ReproductionTools.randomList;
        if(ReproductionTools.randomList){
            OperationsTools.themesLists.random = BarUtils.randomizeList(OperationsTools.themesLists.normal, OperationsTools.themesLists.position);
            OperationsTools.themesLists.position = 0;
            OperationsTools.themesLists.active = OperationsTools.themesLists.random;
        }
        else{
            OperationsTools.themesLists.position = BarUtils.findThemePositionInListById(OperationsTools.themesLists.active, OperationsTools.themesLists.position, OperationsTools.themesLists.normal);
            OperationsTools.themesLists.active = OperationsTools.themesLists.normal;
        }
        ViewTools.setRandomList();
        MiscToolsProgress.setLocalStorage(LocalStorage.random_list_status, ReproductionTools.randomList);
      }

    public static nextTheme(instance: AudioBarComponent, event:Event | number, isCalculed?: boolean){
        let action:HTMLInputElement | number = -1;
        if(event && !isCalculed){
          if(typeof event != 'number' && event.target){
            action = event.target as HTMLInputElement;
            action = parseInt(action.value);
          }
          else if(typeof event == 'number'){
            action = event;
          }
          if(ReproductionTools.loopList){
            action = (OperationsTools.themesLists.position + action < 0) ? OperationsTools.themesLists.active.length -1 : (OperationsTools.themesLists.position + action > OperationsTools.themesLists.normal.length -1) ? 0 : OperationsTools.themesLists.position + action;
            OperationsTools.playOnInit = false;
          }
          else{
            (OperationsTools.themesLists.position + action < 0) ? 
              (action = 0, OperationsTools.playOnInit = true) : 
              (OperationsTools.themesLists.position + action > OperationsTools.themesLists.active.length -1) ? 
                (action = OperationsTools.themesLists.active.length -1, OperationsTools.playOnInit = true) : 
                (action = OperationsTools.themesLists.position + action, OperationsTools.playOnInit = false);
          }
        }
        if(isCalculed){
          action = event as number;
        }
        OperationsTools.themesLists.position = action;
        const theme = OperationsTools.themesLists.active[OperationsTools.themesLists.position];
        OperationsTools.prepareTheme(instance, theme);
        ReproductionTools.updateURI(theme);
    }

    public static updateURI(theme: Theme): void{
      history.replaceState({page:1},'',`/Media${theme.path}`);
    }

}