import { AudioBarComponent } from "src/app/components/audio-bar/audio-bar/audio-bar.component";
import { BarUtils } from "./audio-bar.tools";
import { MiscToolsProgress } from "./misc.tools";
import { Elements_Id } from "../variables/Bar-Variables";
import { ViewTools } from "./view.tools";

export class DragEvent{

    protected static mouseDwnAudio = false;  
    protected static mouseDwnVolume = false;

    static toClick(event:MouseEvent | TouchEvent, instance: AudioBarComponent){
        const itemId = event.target as HTMLElement ;
        const rect = itemId.getBoundingClientRect();
        const offsetX = (event instanceof MouseEvent) ? event.offsetX : event.changedTouches[0].clientX - rect.left;
        if(itemId.id == Elements_Id.progress_bar_area){
          (!instance.isReverse) ? instance.calculateAudioPosition(offsetX) : instance.calculateAudioPosition(ViewTools.progressBars.media.size - offsetX) ;
          instance.DragProgress.mouseDownAudio(instance);
        }
        if(itemId.id == Elements_Id.vol_bar_area){
            instance.calculateVolumePosition(offsetX);
            instance.DragVolume.mouseDownVolume(instance);
        }
    }

    static mouseDrag(event:MouseEvent | TouchEvent, instance: AudioBarComponent){
        ViewTools.showTimePointer(event, instance);
        if(DragEvent.mouseDwnAudio == true){
            instance.DragProgress.audioBarDrag(event, instance);
        }
        if(DragEvent.mouseDwnVolume == true){
            instance.DragVolume.volumeBarDrag(event, instance);
        }
    }

    static ProgressBar = {
        audioBarDrag(event:MouseEvent | TouchEvent, instance: AudioBarComponent){
            let audioBarPosition = MiscToolsProgress.getElementById(Elements_Id.progress_bar_area);
            let position = (audioBarPosition) ? audioBarPosition.getBoundingClientRect().left : 0;
            event.preventDefault();
            const clientX = (event instanceof MouseEvent) ? event.clientX : event.changedTouches[0].clientX;
            if(clientX - position >= 0 && clientX - position <= ViewTools.progressBars.media.size){
              const movement = BarUtils.positionInBar(clientX, audioBarPosition)
              ViewTools.progressBars.media.progress = movement;
            }
        },
      
        mouseDownAudio(instance: AudioBarComponent){
          if(instance.theme.audio){
            instance.audioStatus = (instance.theme.audio.paused) ? false : true; 
            instance.theme.audio.pause();
            DragEvent.mouseDwnAudio = true;
          }
        },
      
        mouseUpAudio(instance: AudioBarComponent){
          if(instance.theme.audio && DragEvent.mouseDwnAudio == true){
            (!instance.isReverse) ? instance.calculateAudioPosition(ViewTools.progressBars.media.progress) : instance.calculateAudioPosition(ViewTools.progressBars.media.size - ViewTools.progressBars.media.progress);
            (instance.audioStatus) ? instance.theme.audio.play(): instance.theme.audio.pause();
            DragEvent.mouseDwnAudio = false;
          }
        },
    }

    static VolBar = {
        volumeBarDrag(event:MouseEvent | TouchEvent, instance: AudioBarComponent){
            const volBarPosition = MiscToolsProgress.getElementById(Elements_Id.vol_bar_small);
            const clientX = (event instanceof MouseEvent) ? event.clientX : event.changedTouches[0].clientX;
            const position = BarUtils.positionInBar(clientX, volBarPosition);
            event.preventDefault();
        
            if(position >= -1 && position <= ViewTools.progressBars.volume.size + 1){
              ViewTools.progressBars.volume.progress = position;
            }
            instance.calculateVolumePosition(ViewTools.progressBars.volume.progress);
          },
        
          mouseUpVolume(instance: AudioBarComponent){
            if(DragEvent.mouseDwnVolume == true){
                instance.calculateVolumePosition(ViewTools.progressBars.volume.progress)
                DragEvent.mouseDwnVolume = false;
            }
          },
        
          mouseDownVolume(instance: AudioBarComponent){
            DragEvent.mouseDwnVolume = true;
          }
    }

}