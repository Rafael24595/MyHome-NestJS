import { ActivatedRoute } from "@angular/router";
import { Theme } from "src/classes/File/Theme";
import { MiscTools } from "src/utils/tools/misc.tools";
import { AudioBarComponent } from "../../audio-bar.component";
import { ProgressBarListener } from "../services/listener.service";
import { Media } from "../variables/Bar-Variables";
import { LocalStorage } from "../variables/storage.const";
import { BarUtils } from "./audio-bar.tools";
import { MiscToolsProgress } from "./misc.tools";
import { ReproductionTools } from "./reproduction.tools";
import { ViewTools } from "./view.tools";

export class OperationsTools{

  public static speed = 1; 
  public static playOnInit = true;
  public static audioPlaying = false;
  public static isReverse = false;

  public static theme: {audio: HTMLAudioElement | undefined, data: Theme} = {
    audio: new Audio(),
    data: Theme.getEmptyTheme(),
  }
  public static themesLists: {normal: Theme[],random: Theme[],active: Theme[], position: number} = {
    normal: [],
    random: [],
    active: [],
    position: 0
  }

  constructor(progressBarListener: ProgressBarListener, route: ActivatedRoute) {
    console.log(route);
  }

  public static setInitialValues(instance: AudioBarComponent){
      OperationsTools.setTheme(instance);
      OperationsTools.setThemeListListener(instance);
  }

  public static destroyComponent(instance: AudioBarComponent){
      if(OperationsTools.theme.audio) OperationsTools.theme.audio.pause();
      OperationsTools.themesLists = {normal: [],random: [],active: [],position: 0};
      instance.progressBarListener.unsubscribe();
  }

  public static prepareTheme(instance: AudioBarComponent, theme?:Theme){

      let src = ''; 
  
      if(theme){
        OperationsTools.isReverse =  false;
        instance.reverseSrc = '';
        src = `${Media.path}/${theme.path}`;
        OperationsTools.theme.data = theme;
      }
      else{
        src = (OperationsTools.isReverse) ? instance.reverseSrc : `${Media.path}/${OperationsTools.theme.data.path}`;
      }
      
      if(OperationsTools.theme.audio) {OperationsTools.theme.audio.pause();}
      OperationsTools.theme.audio = new Audio();
      OperationsTools.theme.audio.src = src;
      OperationsTools.theme.audio.classList.add('reproductor-audio');
      OperationsTools.theme.audio.load();
      OperationsTools.theme.audio.onloadedmetadata = ()=>{
        if(OperationsTools.theme.audio){
          OperationsTools.theme.audio.onloadeddata = ()=>{
            if(OperationsTools.theme.audio){
              OperationsTools.theme.audio.onpause = ()=>{ViewTools.setPlay(instance)}
              OperationsTools.theme.audio.onplay = ()=>{ViewTools.setPlay(instance)}
              OperationsTools.theme.audio.onvolumechange = ()=>{ViewTools.progressBarVolume()};
              OperationsTools.theme.audio.ontimeupdate = ()=>{ViewTools.progressBarAudio(instance)}
              OperationsTools.theme.audio.onended = ()=>{ReproductionTools.nextTheme(instance, 1)}
      
              OperationsTools.setDefaultThemeValues();
              ViewTools.setDefaultInterfaceValues(instance);
            }
          }
        }
      }
      OperationsTools.theme.audio.onerror = (err)=>{OperationsTools.theme.audio = undefined; console.error(err)};
    }

  private static setTheme(instance: AudioBarComponent){
      const path = MiscTools.getChildPath(instance.route);
      OperationsTools.themesLists.normal = [new Theme('', path, '', {id: '', name: ''}, 0, 0, [])];
      OperationsTools.prepareTheme(instance, OperationsTools.themesLists.normal[0]);
    }
  
  private static setThemeListListener(instance: AudioBarComponent){
      instance.progressBarListener.themeListObservable.subscribe((themeList: Theme[])=>{
          if(themeList){
            OperationsTools.themesLists.normal = themeList;
            OperationsTools.themesLists.active = OperationsTools.themesLists.normal;
            OperationsTools.themesLists.position = BarUtils.findThemePositionInListByPath(OperationsTools.theme.data, OperationsTools.themesLists.active);
              if(MiscToolsProgress.getLocalStorage(LocalStorage.random_list_status)) ReproductionTools.randomReproduction();
          }
      });
  }

  private static setDefaultThemeValues(){

      let muted = MiscToolsProgress.getLocalStorage(LocalStorage.mute_status);
      let loop = MiscToolsProgress.getLocalStorage(LocalStorage.loop_status);
      let volume = MiscToolsProgress.getLocalStorage(LocalStorage.volume_status);
      let velocity = MiscToolsProgress.getLocalStorage(LocalStorage.velocity_status);
      let listLoop = MiscToolsProgress.getLocalStorage(LocalStorage.loop_list_status);
      let listRandom = MiscToolsProgress.getLocalStorage(LocalStorage.random_list_status);
  
      if(OperationsTools.theme.audio){
        OperationsTools.theme.audio.muted = (muted) ? muted : OperationsTools.theme.audio.muted;
        OperationsTools.theme.audio.loop = (loop) ? loop : OperationsTools.theme.audio.loop;
        OperationsTools.theme.audio.volume = (volume) ? volume : OperationsTools.theme.audio.volume;
        OperationsTools.theme.audio.playbackRate = (velocity) ? velocity : OperationsTools.theme.audio.playbackRate;
        ReproductionTools.loopList = (listLoop) ? listLoop : false;
        ReproductionTools.randomList = (listRandom) ? listRandom : false;
  
          if (OperationsTools.theme.audio && !OperationsTools.playOnInit) OperationsTools.theme.audio.play();
  
      }
  
    }

  public static setPlayPause(instance: AudioBarComponent, mode?:string){
      if(OperationsTools.theme.audio){
        if(OperationsTools.theme.audio.paused || mode == 'play'){
          OperationsTools.theme.audio.play();
        }
        else if(!OperationsTools.theme.audio.paused || mode == 'stop'){
          OperationsTools.theme.audio.pause();
        }
      }
      else if(mode != 'stop' && OperationsTools.themesLists.active){
          OperationsTools.prepareTheme(instance, OperationsTools.themesLists.active[OperationsTools.themesLists.position]);
      }
    }

    public static muteVol(){
      if(OperationsTools.theme.audio){
        OperationsTools.theme.audio.muted = !OperationsTools.theme.audio.muted;
          MiscToolsProgress.setLocalStorage(LocalStorage.mute_status, OperationsTools.theme.audio.muted);
      }
    }
  
    public static updateSpeed(){
      if(OperationsTools.theme.audio){
        OperationsTools.theme.audio.playbackRate = OperationsTools.speed;
          MiscToolsProgress.setLocalStorage(LocalStorage.velocity_status, OperationsTools.theme.audio.playbackRate);
      }
    }

}