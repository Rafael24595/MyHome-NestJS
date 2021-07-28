import { AudioBarComponent } from "src/app/components/audio-bar/audio-bar/audio-bar.component";
import { BarUtils } from "./audio-bar.tools";
import { Color_Vars, Elements_Id } from "./variables/Bar-Variables";

export class ViewTools{

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
        if(instance.audio){
          let item:HTMLElement | string = event.target as HTMLElement;
          const itemId = item.id;
          const clientX = (event instanceof MouseEvent) ? event.clientX : event.changedTouches[0].clientX;
          item = (itemId == 'Meatball' && item.parentElement) ? item.parentElement : item;
          if((itemId == Elements_Id.progress_bar_area || itemId == 'Meatball') && event.type != 'touchend'){
            instance.overBar = 'block';
            const positionInPage = BarUtils.positionInBar(clientX, item);
            let time = instance.calculeTimeByPixel(positionInPage);
            time = (time <= instance.audio.duration) ? time : instance.audio.duration;
              instance.timePointer = BarUtils.getSeconds(time);
            instance.timePointerPosition = positionInPage;
          }
          else{
            instance.overBar = 'none';
          }
        }
      }

    public static progressBarAudio(instance: AudioBarComponent): void{
        if(instance.audio){
          const currentTimeReverse = instance.audio.duration - instance.audio.currentTime;
          const movement = (!instance.isReverse) ? instance.calculeTimeBySeconds() : instance.calculeTimeBySeconds(currentTimeReverse);

          instance.pointAudioPosition = movement;
          instance.barAudioSizeProgress = movement;
          instance.time = BarUtils.getSeconds((!instance.isReverse) ? Math.trunc(instance.audio.currentTime) : Math.trunc(currentTimeReverse));
          instance.lastTime = instance.audio.currentTime;

        }
    }

    public static setLoopAudio(instance: AudioBarComponent): void{
        if(instance.audio){
          if(instance.audio.loop){
            instance.loopColor = Color_Vars.button_loop_color.loop;
          }
          else{
            instance.loopColor = Color_Vars.button_loop_color.normal;
          }
        }
    }

    public static setTime(instance: AudioBarComponent): void{
        if(instance.audio){
            instance.maxTime =  BarUtils.getSeconds(instance.audio.duration);
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
        if(instance.audio){
          if(instance.isReverse){
            instance.reverseColor = Color_Vars.button_reverse_color.reverse;
            instance.barColor = (instance.audio.paused) ? Color_Vars.bar_progress_color.reverse_rause : Color_Vars.bar_progress_color.reverse_play;
          }
          else{
            instance.reverseColor = Color_Vars.button_reverse_color.normal;
            instance.barColor = (instance.audio.paused) ? Color_Vars.bar_progress_color.pause : Color_Vars.bar_progress_color.play;
          }
        }
    }

    public static setPlay(instance: AudioBarComponent): void{
        if(instance.audio){
          if(instance.audio.paused){
            instance.barColor = (instance.isReverse) ? Color_Vars.bar_progress_color.reverse_rause : Color_Vars.bar_progress_color.pause; 
            instance.playButtonColor = Color_Vars.button_play_color.pause;
            instance.playLogo = '!';
          }
          else{
            instance.barColor = (instance.isReverse) ? Color_Vars.bar_progress_color.reverse_play : Color_Vars.bar_progress_color.play;
            instance.playButtonColor = Color_Vars.button_play_color.play;
            instance.playLogo = '"';
          }
        }
    }

    public static setVolLogo(instance: AudioBarComponent): void{
        if(instance.audio){
          const volActual = instance.audio.volume;
          const percentage = volActual * 100 / 25;
          
          if(percentage <= 0){
            instance.volLogo = (instance.audio.muted) ? Color_Vars.volume_logo.percentage_0_muted : Color_Vars.volume_logo.percentage_0;
          }
          if(percentage > 0 && percentage <= 1){
            instance.volLogo = (instance.audio.muted) ? Color_Vars.volume_logo.percentage_25_muted : Color_Vars.volume_logo.percentage_25;
          }
          if(percentage > 1 && percentage < 3){
            instance.volLogo = (instance.audio.muted) ? Color_Vars.volume_logo.percentage_50_muted : Color_Vars.volume_logo.percentage_50;
          }
          if(percentage >= 3){
            instance.volLogo = (instance.audio.muted) ? Color_Vars.volume_logo.percentage_75_muted : Color_Vars.volume_logo.percentage_75;
          }
    
        }
    }

    public static setMuted(instance: AudioBarComponent): void{
        if(instance.audio && instance.audio.muted){
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