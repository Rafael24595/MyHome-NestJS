import { AudioBarComponent } from "src/app/components/audio-bar/audio-bar/audio-bar.component";
import { BarUtils } from "./audio-bar.tools";
import { MiscToolsProgress } from "./misc.tools";
import { Color_Vars, Elements_Id, Icons } from "../variables/Bar-Variables";
import { Time } from "../variables/interface.const";
import { LocalStorage } from "../variables/storage.const";

export class ViewTools{

    static viewStatus: {playLogo: string, volLogo: string, time: string, maxTime: string, timeToolTip: {value: string, display: string}} = {
      playLogo: Icons.play,
      volLogo: Color_Vars.volume_logo.percentage_75,
      time: Time.default,
      maxTime: Time.default,
      timeToolTip: {
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

    public static setDefaultInterfaceValues(instance: AudioBarComponent){
        ViewTools.progressBarAudio(instance);
        ViewTools.setLoopAudio(instance);
        ViewTools.setTime(instance);
        ViewTools.setLoopList(instance);
        ViewTools.setRandomList(instance);
        ViewTools.setReverse(instance);
        ViewTools.setPlay(instance); 
    }

    public static showTimePointer(event:MouseEvent | TouchEvent, instance: AudioBarComponent): void{
        if(instance.theme.audio){
          let item:HTMLElement | string = event.target as HTMLElement;
          const itemId = item.id;
          const clientX = (event instanceof MouseEvent) ? event.clientX : event.changedTouches[0].clientX;
          item = (itemId == 'Meatball' && item.parentElement) ? item.parentElement : item;
          if((itemId == Elements_Id.progress_bar_area || itemId == 'Meatball') && event.type != 'touchend'){
            ViewTools.viewStatus.timeToolTip.display = 'block';
            const positionInPage = BarUtils.positionInBar(clientX, item);
            let time = BarUtils.calculeTimeByPixel(instance.theme.audio, positionInPage, ViewTools.progressBars.media.size);
            time = (time <= instance.theme.audio.duration) ? time : instance.theme.audio.duration;
            ViewTools.viewStatus.timeToolTip.value = BarUtils.getSeconds(time);
            instance.timePointerPosition = positionInPage;
          }
          else{
            ViewTools.viewStatus.timeToolTip.display = 'none';
          }
        }
      }

    public static progressBarAudio(instance: AudioBarComponent): void{
        if(instance.theme.audio){
          const currentTimeReverse = instance.theme.audio.duration - instance.theme.audio.currentTime;
          const movement = (!instance.isReverse) ? BarUtils.calculeTimeBySeconds(instance.theme.audio, ViewTools.progressBars.media.size) : BarUtils.calculeTimeBySeconds(instance.theme.audio, ViewTools.progressBars.media.size, currentTimeReverse);

          ViewTools.progressBars.media.progress = movement;
          ViewTools.viewStatus.time = BarUtils.getSeconds((!instance.isReverse) ? Math.trunc(instance.theme.audio.currentTime) : Math.trunc(currentTimeReverse));
        }
    }

    public static progressBarVolume(instance: AudioBarComponent): void{
      if(instance.theme.audio){
        let volActual = instance.theme.audio.volume;
        let movement = volActual * ViewTools.progressBars.volume.size;
        ViewTools.progressBars.volume.progress = movement;
  
        ViewTools.setMuted(instance);
        ViewTools.setVolLogo(instance);
        MiscToolsProgress.setLocalStorage(LocalStorage.volume_status, instance.theme.audio.volume);
      }
    }

    public static setLoopAudio(instance: AudioBarComponent): void{
        if(instance.theme.audio){
          if(instance.theme.audio.loop){
            instance.loopColor = Color_Vars.button_loop_color.loop;
          }
          else{
            instance.loopColor = Color_Vars.button_loop_color.normal;
          }
        }
    }

    public static setTime(instance: AudioBarComponent): void{
        if(instance.theme.audio){
          ViewTools.viewStatus.maxTime =  BarUtils.getSeconds(instance.theme.audio.duration);
        }
    }

    public static setLoopList(instance: AudioBarComponent): void{
        if(instance.loopList){
            instance.loopListColor = Color_Vars.button_loop_list_color.loop;
        }
        else{
            instance.loopListColor = Color_Vars.button_loop_list_color.normal;
        }
    }

    public static setRandomList(instance: AudioBarComponent): void{
        if(instance.randomList){
            instance.randomColor = Color_Vars.button_random_color.random;
        }
        else{
            instance.randomColor = Color_Vars.button_random_color.normal;
        }
    }

    public static setReverse(instance: AudioBarComponent): void{
        if(instance.theme.audio){
          if(instance.isReverse){
            instance.reverseColor = Color_Vars.button_reverse_color.reverse;
            instance.barColor = (instance.theme.audio.paused) ? Color_Vars.bar_progress_color.reverse_rause : Color_Vars.bar_progress_color.reverse_play;
          }
          else{
            instance.reverseColor = Color_Vars.button_reverse_color.normal;
            instance.barColor = (instance.theme.audio.paused) ? Color_Vars.bar_progress_color.pause : Color_Vars.bar_progress_color.play;
          }
        }
    }

    public static setPlay(instance: AudioBarComponent): void{
        if(instance.theme.audio){
          if(instance.theme.audio.paused){
            instance.barColor = (instance.isReverse) ? Color_Vars.bar_progress_color.reverse_rause : Color_Vars.bar_progress_color.pause; 
            ViewTools.viewStatus.playLogo = Icons.play;
          }
          else{
            instance.barColor = (instance.isReverse) ? Color_Vars.bar_progress_color.reverse_play : Color_Vars.bar_progress_color.play;
            ViewTools.viewStatus.playLogo = Icons.pause;
          }
        }
    }

    public static setVolLogo(instance: AudioBarComponent): void{
        if(instance.theme.audio){
          const volActual = instance.theme.audio.volume;
          const percentage = volActual * 100 / 25;
          
          if(percentage <= 0){
            ViewTools.viewStatus.volLogo = (instance.theme.audio.muted) ? Color_Vars.volume_logo.percentage_0_muted : Color_Vars.volume_logo.percentage_0;
          }
          if(percentage > 0 && percentage <= 1){
            ViewTools.viewStatus.volLogo = (instance.theme.audio.muted) ? Color_Vars.volume_logo.percentage_25_muted : Color_Vars.volume_logo.percentage_25;
          }
          if(percentage > 1 && percentage < 3){
            ViewTools.viewStatus.volLogo = (instance.theme.audio.muted) ? Color_Vars.volume_logo.percentage_50_muted : Color_Vars.volume_logo.percentage_50;
          }
          if(percentage >= 3){
            ViewTools.viewStatus.volLogo = (instance.theme.audio.muted) ? Color_Vars.volume_logo.percentage_75_muted : Color_Vars.volume_logo.percentage_75;
          }
    
        }
    }

    public static setMuted(instance: AudioBarComponent): void{
        if(instance.theme.audio && instance.theme.audio.muted){
            instance.muteColor = Color_Vars.button_mute_color.muted;
            instance.barVolColor = Color_Vars.bar_volume_color.front.muted;
            instance.barVolColorBack = Color_Vars.bar_volume_color.background.muted;
            instance.babyMeatballColor = Color_Vars.meatball_color.baby.muted;
        }
        else{
            instance.muteColor = Color_Vars.button_mute_color.unmuted;
            instance.barVolColor = Color_Vars.bar_volume_color.front.unmuted;
            instance.barVolColorBack = Color_Vars.bar_volume_color.background.unmuted;
          instance.babyMeatballColor = Color_Vars.meatball_color.baby.unmuted;
        }
      }

}