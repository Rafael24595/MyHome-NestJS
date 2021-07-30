import { Theme } from "src/classes/File/Theme";
import { MiscTools } from "src/utils/tools/misc.tools";
import { AudioBarComponent } from "../../audio-bar.component";
import { Media } from "../variables/Bar-Variables";
import { LocalStorage } from "../variables/storage.const";
import { BarUtils } from "./audio-bar.tools";
import { MiscToolsProgress } from "./misc.tools";
import { ViewTools } from "./view.tools";

export class OperationsTools{

    public static setInitialValues(instance: AudioBarComponent){
        OperationsTools.setTheme(instance);
        OperationsTools.setThemeListListener(instance);
    }

    public static destroyComponent(instance: AudioBarComponent){
        if(instance.theme.audio) instance.theme.audio.pause();
        instance.progressBarListener.unsubscribe();
    }

    public static prepareTheme(instance: AudioBarComponent, theme?:Theme){

        let src = ''; 
    
        if(theme){
            instance.isReverse =  false;
            instance.reverseSrc = '';
            src = `${Media.path}/${theme.path}`;
            instance.theme.data = theme;
        }
        else{
          src = (instance.isReverse) ? instance.reverseSrc : `${Media.path}/${instance.theme.data.path}`;
        }
        
        if(instance.theme.audio) {instance.theme.audio.pause();}
        instance.theme.audio = new Audio();
        instance.theme.audio.src = src;
        instance.theme.audio.classList.add('reproductor-audio');
        instance.theme.audio.load();
        instance.theme.audio.onloadedmetadata = ()=>{
          if(instance.theme.audio){
            instance.theme.audio.onloadeddata = ()=>{
              if(instance.theme.audio){
                instance.theme.audio.onpause = ()=>{ViewTools.setPlay(instance)}
                instance.theme.audio.onplay = ()=>{ViewTools.setPlay(instance)}
                instance.theme.audio.onvolumechange = ()=>{ViewTools.progressBarVolume(instance)};
                instance.theme.audio.ontimeupdate = ()=>{ViewTools.progressBarAudio(instance)}
                instance.theme.audio.onended = ()=>{instance.calculeNextThemePosition(1)}
        
                OperationsTools.setDefaultThemeValues(instance);
                ViewTools.setDefaultInterfaceValues(instance);
              }
            }
          }
        }
        instance.theme.audio.onerror = (err)=>{instance.theme.audio = undefined; console.error(err)};
      }

    private static setTheme(instance: AudioBarComponent){
        const path = MiscTools.getChildPath(instance.route);
        instance.themesLists.normal = [new Theme('', path, '', {id: '', name: ''}, 0, 0, [])];
        OperationsTools.prepareTheme(instance, instance.themesLists.normal[0]);
      }
    
    private static setThemeListListener(instance: AudioBarComponent){
        instance.progressBarListener.themeListObservable.subscribe((themeList: Theme[])=>{
            if(themeList){
                instance.themesLists.normal = themeList;
                instance.themesLists.active = instance.themesLists.normal;
                instance.themesLists.position = BarUtils.findThemePositionInListByPath(instance.theme.data, instance.themesLists.active);
                if(MiscToolsProgress.getLocalStorage(LocalStorage.random_list_status)) instance.randomReproduction();
            }
        });
    }

    private static setDefaultThemeValues(instance: AudioBarComponent){

        let muted = MiscToolsProgress.getLocalStorage(LocalStorage.mute_status);
        let loop = MiscToolsProgress.getLocalStorage(LocalStorage.loop_status);
        let volume = MiscToolsProgress.getLocalStorage(LocalStorage.volume_status);
        let velocity = MiscToolsProgress.getLocalStorage(LocalStorage.velocity_status);
        let listLoop = MiscToolsProgress.getLocalStorage(LocalStorage.loop_list_status);
        let listRandom = MiscToolsProgress.getLocalStorage(LocalStorage.random_list_status);
    
        if(instance.theme.audio){
            instance.theme.audio.muted = (muted) ? muted : instance.theme.audio.muted;
            instance.theme.audio.loop = (loop) ? loop : instance.theme.audio.loop;
            instance.theme.audio.volume = (volume) ? volume : instance.theme.audio.volume;
            instance.theme.audio.playbackRate = (velocity) ? velocity : instance.theme.audio.playbackRate;
            instance.loopList = (listLoop) ? listLoop : false;
            instance.randomList = (listRandom) ? listRandom : false;
    
            if (instance.theme.audio && !instance.launchPaused) instance.theme.audio.play();
    
        }
    
      }

    public static setPlayPause(instance: AudioBarComponent, mode?:string){
        if(instance.theme.audio){
          if(instance.theme.audio.paused || mode == 'play'){
            instance.theme.audio.play();
          }
          else if(!instance.theme.audio.paused || mode == 'stop'){
            instance.theme.audio.pause();
          }
        }
        else if(mode != 'stop' && instance.themesLists.active){
            OperationsTools.prepareTheme(instance, instance.themesLists.active[instance.themesLists.position]);
        }
      }

      public static muteVol(instance: AudioBarComponent){
        if(instance.theme.audio){
            instance.theme.audio.muted = !instance.theme.audio.muted;
            MiscToolsProgress.setLocalStorage(LocalStorage.mute_status, instance.theme.audio.muted);
        }
      }
    
      public static updateSpeed(instance: AudioBarComponent){
        if(instance.theme.audio){
            instance.theme.audio.playbackRate = instance.speed;
            MiscToolsProgress.setLocalStorage(LocalStorage.velocity_status, instance.theme.audio.playbackRate);
        }
      }

      public static loopListReproduction(instance: AudioBarComponent){
        instance.loopList = !instance.loopList;
        ViewTools.setLoopList(instance);
        MiscToolsProgress.setLocalStorage(LocalStorage.loop_list_status, instance.loopList);
      }
    
      public static loopAudio(instance: AudioBarComponent){
        if(instance.theme.audio){
            instance.theme.audio.loop = !instance.theme.audio.loop;
            ViewTools.setLoopAudio(instance);
            MiscToolsProgress.setLocalStorage(LocalStorage.loop_status, instance.theme.audio.loop);
        }
      }

}