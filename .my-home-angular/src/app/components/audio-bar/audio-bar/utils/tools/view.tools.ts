import { BarUtils } from "./audio-bar.tools";
import { MiscToolsProgress } from "./misc.tools";
import { Color_Vars, Elements_Id, Icons } from "../variables/Bar-Variables";
import { Time } from "../variables/interface.const";
import { LocalStorage } from "../variables/storage.const";
import { OperationsTools } from "./operations.tools";
import { ReproductionTools } from "./reproduction.tools";

export class ViewTools{

    static showLite = 'hidden';

    static viewStatus: {playLogo: string, volLogo: string, time: string, maxTime: string, timeToolTip: {position:number ,value: string, display: string}} = {
      playLogo: Icons.play,
      volLogo: Color_Vars.volume_logo.percentage_75,
      time: Time.default,
      maxTime: Time.default,
      timeToolTip: {
        position: 0,
        value: Time.default,
        display: 'none'
      }
    }

    static progressBars = {
      media:{
        size: 0,
        progress: 0
      },
      volume:{
        size: 0,
        progress: 0
      }
    }

    static buttonsColor = {
      loadGif: Color_Vars.load_gif_status.hidden,
      barColor: Color_Vars.bar_progress_color.pause,
      barVolColorBack: Color_Vars.bar_volume_color.background.unmuted,
      barVolColor: Color_Vars.bar_volume_color.front.unmuted,
      babyMeatballColor: Color_Vars.meatball_color.baby.unmuted,
      muteColor: Color_Vars.button_mute_color.unmuted,
      loopColor: Color_Vars.button_loop_color.normal,
      randomColor: Color_Vars.button_random_color.normal,
      loopListColor: Color_Vars.button_loop_list_color.normal,
      reverseColor: Color_Vars.button_reverse_color.normal
    }

    public static setDefaultInterfaceValues(){
        ViewTools.progressBarAudio();
        ViewTools.setLoopAudio();
        ViewTools.setTime();
        ViewTools.setLoopList();
        ViewTools.setRandomList();
        ViewTools.setReverse();
        ViewTools.setPlay(); 
    }

    public static showTimePointer(event:MouseEvent | TouchEvent): void{
        if(OperationsTools.theme.audio){
          let item:HTMLElement | string = event.target as HTMLElement;
          const itemId = item.id;
          const clientX = (event instanceof MouseEvent) ? event.clientX : event.changedTouches[0].clientX;
          item = (itemId == 'Meatball' && item.parentElement) ? item.parentElement : item;
          if((itemId == Elements_Id.progress_bar_area || itemId == 'Meatball') && event.type != 'touchend'){
            ViewTools.viewStatus.timeToolTip.display = 'block';
            const positionInPage = BarUtils.positionInBar(clientX, item);
            let time = BarUtils.calculeTimeByPixel(OperationsTools.theme.audio, positionInPage, ViewTools.progressBars.media.size);
            time = (time <= OperationsTools.theme.audio.duration) ? time : OperationsTools.theme.audio.duration;
            ViewTools.viewStatus.timeToolTip.value = BarUtils.getSeconds(time);
            ViewTools.viewStatus.timeToolTip.position = positionInPage;
          }
          else{
            ViewTools.viewStatus.timeToolTip.display = 'none';
          }
        }
      }

    public static progressBarAudio(): void{
        if(OperationsTools.theme.audio){
          const currentTimeReverse = OperationsTools.theme.audio.duration - OperationsTools.theme.audio.currentTime;
          const movement = (!OperationsTools.isReverse) ? BarUtils.calculeTimeBySeconds(OperationsTools.theme.audio, ViewTools.progressBars.media.size) : BarUtils.calculeTimeBySeconds(OperationsTools.theme.audio, ViewTools.progressBars.media.size, currentTimeReverse);

          ViewTools.progressBars.media.progress = movement;
          ViewTools.viewStatus.time = BarUtils.getSeconds((!OperationsTools.isReverse) ? Math.trunc(OperationsTools.theme.audio.currentTime) : Math.trunc(currentTimeReverse));
        }
    }

    public static progressBarVolume(): void{
      if(OperationsTools.theme.audio){
        let volActual = OperationsTools.theme.audio.volume;
        let movement = volActual * ViewTools.progressBars.volume.size;
        ViewTools.progressBars.volume.progress = movement;
  
        ViewTools.setMuted();
        ViewTools.setVolLogo();
        MiscToolsProgress.setLocalStorage(LocalStorage.volume_status, OperationsTools.theme.audio.volume);
      }
    }

    public static setLoopAudio(): void{
        if(OperationsTools.theme.audio){
          if(OperationsTools.theme.audio.loop){
            ViewTools.buttonsColor.loopColor = Color_Vars.button_loop_color.loop;
          }
          else{
            ViewTools.buttonsColor.loopColor = Color_Vars.button_loop_color.normal;
          }
        }
    }

    public static setTime(): void{
        if(OperationsTools.theme.audio){
          ViewTools.viewStatus.maxTime =  BarUtils.getSeconds(OperationsTools.theme.audio.duration);
        }
    }

    public static setLoopList(): void{
        if(ReproductionTools.loopList){
          ViewTools.buttonsColor.loopListColor = Color_Vars.button_loop_list_color.loop;
        }
        else{
          ViewTools.buttonsColor.loopListColor = Color_Vars.button_loop_list_color.normal;
        }
    }

    public static setRandomList(): void{
        if(ReproductionTools.randomList){
          ViewTools.buttonsColor.randomColor = Color_Vars.button_random_color.random;
        }
        else{
          ViewTools.buttonsColor.randomColor = Color_Vars.button_random_color.normal;
        }
    }

    public static setReverse(): void{
        if(OperationsTools.theme.audio){
          if(OperationsTools.isReverse){
            ViewTools.buttonsColor.reverseColor = Color_Vars.button_reverse_color.reverse;
            ViewTools.buttonsColor.barColor = (OperationsTools.theme.audio.paused) ? Color_Vars.bar_progress_color.reverse_rause : Color_Vars.bar_progress_color.reverse_play;
          }
          else{
            ViewTools.buttonsColor.reverseColor = Color_Vars.button_reverse_color.normal;
            ViewTools.buttonsColor.barColor = (OperationsTools.theme.audio.paused) ? Color_Vars.bar_progress_color.pause : Color_Vars.bar_progress_color.play;
          }
        }
    }

    public static setPlay(): void{
        if(OperationsTools.theme.audio){
          if(OperationsTools.theme.audio.paused){
            ViewTools.buttonsColor.barColor = (OperationsTools.isReverse) ? Color_Vars.bar_progress_color.reverse_rause : Color_Vars.bar_progress_color.pause; 
            ViewTools.viewStatus.playLogo = Icons.play;
          }
          else{
            ViewTools.buttonsColor.barColor = (OperationsTools.isReverse) ? Color_Vars.bar_progress_color.reverse_play : Color_Vars.bar_progress_color.play;
            ViewTools.viewStatus.playLogo = Icons.pause;
          }
        }
    }

    public static setVolLogo(): void{
        if(OperationsTools.theme.audio){
          const volActual = OperationsTools.theme.audio.volume;
          const percentage = volActual * 100 / 25;
          
          if(percentage <= 0){
            ViewTools.viewStatus.volLogo = (OperationsTools.theme.audio.muted) ? Color_Vars.volume_logo.percentage_0_muted : Color_Vars.volume_logo.percentage_0;
          }
          if(percentage > 0 && percentage <= 1){
            ViewTools.viewStatus.volLogo = (OperationsTools.theme.audio.muted) ? Color_Vars.volume_logo.percentage_25_muted : Color_Vars.volume_logo.percentage_25;
          }
          if(percentage > 1 && percentage < 3){
            ViewTools.viewStatus.volLogo = (OperationsTools.theme.audio.muted) ? Color_Vars.volume_logo.percentage_50_muted : Color_Vars.volume_logo.percentage_50;
          }
          if(percentage >= 3){
            ViewTools.viewStatus.volLogo = (OperationsTools.theme.audio.muted) ? Color_Vars.volume_logo.percentage_75_muted : Color_Vars.volume_logo.percentage_75;
          }
    
        }
    }

    public static setMuted(): void{
        if(OperationsTools.theme.audio && OperationsTools.theme.audio.muted){
          ViewTools.buttonsColor.muteColor = Color_Vars.button_mute_color.muted;
          ViewTools.buttonsColor.barVolColor = Color_Vars.bar_volume_color.front.muted;
          ViewTools.buttonsColor.barVolColorBack = Color_Vars.bar_volume_color.background.muted;
          ViewTools.buttonsColor.babyMeatballColor = Color_Vars.meatball_color.baby.muted;
        }
        else{
          ViewTools.buttonsColor.muteColor = Color_Vars.button_mute_color.unmuted;
          ViewTools.buttonsColor.barVolColor = Color_Vars.bar_volume_color.front.unmuted;
          ViewTools.buttonsColor.barVolColorBack = Color_Vars.bar_volume_color.background.unmuted;
          ViewTools.buttonsColor.babyMeatballColor = Color_Vars.meatball_color.baby.unmuted;
        }
      }

}