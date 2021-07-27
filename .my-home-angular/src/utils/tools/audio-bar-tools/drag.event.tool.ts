import { AudioBarComponent } from "src/app/components/audio-bar/audio-bar/audio-bar.component";
import { BarUtils } from "./audio-bar.tools";
import { MiscTools } from "./misc.tools";
import { Elements_Id } from "./variables/Bar-Variables";
import { ViewTools } from "./view.tools";

export class DragEvent{

    static toClick(event:MouseEvent | TouchEvent, instance: AudioBarComponent){
        const itemId = event.target as HTMLElement ;
        const rect = itemId.getBoundingClientRect();
        const offsetX = (event instanceof MouseEvent) ? event.offsetX : event.changedTouches[0].clientX - rect.left;
        if(itemId.id == Elements_Id.progress_bar_area){
          (!instance.isReverse) ? instance.calculateAudioPosition(offsetX) : instance.calculateAudioPosition(instance.barAudioSize - offsetX) ;
          instance.DragProgress.mouseDownAudio(instance);
        }
        if(itemId.id == Elements_Id.vol_bar_area){
            instance.calculateVolumePosition(offsetX);
            instance.DragVolume.mouseDownVolume(instance);
        }
    }

    static mouseDrag(event:MouseEvent | TouchEvent, instance: AudioBarComponent){
        ViewTools.showTimePointer(event, instance);
        if(instance.mouseDwnAudio == true){
            instance.DragProgress.audioBarDrag(event, instance);
        }
        if(instance.mouseDwnVolume == true){
            instance.DragVolume.volumeBarDrag(event, instance);
        }
    }

    static ProgressBar = {
        audioBarDrag(event:MouseEvent | TouchEvent, instance: AudioBarComponent){
            let audioBarPosition = MiscTools.getElementById(Elements_Id.progress_bar_area);
            let position = (audioBarPosition) ? audioBarPosition.offsetLeft : 0;
            event.preventDefault();
            const clientX = (event instanceof MouseEvent) ? event.clientX : event.changedTouches[0].clientX;
            if(clientX - position >= 0 && clientX - position <= instance.barAudioSize){
              let movement = BarUtils.positionInBar(clientX, audioBarPosition)
              instance.pointAudioPosition = movement;
              instance.barAudioSizeProgress = movement;
            }
        },
      
        mouseDownAudio(instance: AudioBarComponent){
          if(instance.audio){
            instance.audioStatus = (instance.audio.paused) ? false : true; 
            instance.audio.pause();
            instance.mouseDwnAudio = true;
          }
        },
      
        mouseUpAudio(instance: AudioBarComponent){
          if(instance.audio && instance.mouseDwnAudio == true){
            (!instance.isReverse) ? instance.calculateAudioPosition(instance.pointAudioPosition) : instance.calculateAudioPosition(instance.barAudioSize - instance.pointAudioPosition);
            (instance.audioStatus) ? instance.audio.play(): instance.audio.pause();
            instance.mouseDwnAudio = false;
          }
        },
    }

    static VolBar = {
        volumeBarDrag(event:MouseEvent | TouchEvent, instance: AudioBarComponent){
            let volBarPosition = MiscTools.getElementById(Elements_Id.vol_bar_small);
            const clientX = (event instanceof MouseEvent) ? event.clientX : event.changedTouches[0].clientX;
            let position = BarUtils.positionInBar(clientX, volBarPosition);
            event.preventDefault();
        
            if(position >= -1 && position <= instance.barVolumeSize + 1){
                instance.pointVolumePosition = position
                instance.barVolumeSizeProgress = position;
            }
            instance.calculateVolumePosition(instance.pointVolumePosition);
          },
        
          mouseUpVolume(instance: AudioBarComponent){
            if(instance.mouseDwnVolume == true){
                instance.calculateVolumePosition(instance.pointVolumePosition)
                instance.mouseDwnVolume = false;
            }
          },
        
          mouseDownVolume(instance: AudioBarComponent){
            instance.mouseDwnVolume = true;
          }
    }

}