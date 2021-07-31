import { AudioBarComponent } from "src/app/components/audio-bar/audio-bar/audio-bar.component";
import { BarUtils } from "./audio-bar.tools";
import { MiscToolsProgress } from "./misc.tools";
import { Elements_Id } from "../variables/Bar-Variables";
import { ViewTools } from "./view.tools";
import { OperationsTools } from "./operations.tools";

export class DragEvent{

    protected static mouseDwnAudio = false;  
    protected static mouseDwnVolume = false;

    static toClick(event:MouseEvent | TouchEvent, instance: AudioBarComponent){
        const itemId = event.target as HTMLElement ;
        const rect = itemId.getBoundingClientRect();
        const offsetX = (event instanceof MouseEvent) ? event.offsetX : event.changedTouches[0].clientX - rect.left;
        if(itemId.id == Elements_Id.progress_bar_area){
          (!instance.isReverse) ? DragEvent.ProgressBar.calculateAudioPosition(offsetX) : DragEvent.ProgressBar.calculateAudioPosition(ViewTools.progressBars.media.size - offsetX) ;
          instance.DragProgress.mouseDownAudio();
        }
        if(itemId.id == Elements_Id.vol_bar_area){
            DragEvent.VolBar.calculateVolumePosition(instance, offsetX);
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
      
        mouseDownAudio(){
          if(OperationsTools.theme.audio){
            OperationsTools.audioPlaying = (OperationsTools.theme.audio.paused) ? false : true; 
            OperationsTools.theme.audio.pause();
            DragEvent.mouseDwnAudio = true;
          }
        },
      
        mouseUpAudio(instance: AudioBarComponent){
          if(OperationsTools.theme.audio && DragEvent.mouseDwnAudio == true){
            (!instance.isReverse) ? DragEvent.ProgressBar.calculateAudioPosition(ViewTools.progressBars.media.progress) : DragEvent.ProgressBar.calculateAudioPosition(ViewTools.progressBars.media.size - ViewTools.progressBars.media.progress);
            (OperationsTools.audioPlaying) ? OperationsTools.theme.audio.play(): OperationsTools.theme.audio.pause();
            DragEvent.mouseDwnAudio = false;
          }
        },
        calculateAudioPosition(coorY:number){
          if(OperationsTools.theme.audio){
            OperationsTools.theme.audio.currentTime = coorY * OperationsTools.theme.audio.duration / ViewTools.progressBars.media.size;
          }
        }
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
            DragEvent.VolBar.calculateVolumePosition(instance, ViewTools.progressBars.volume.progress);
          },
        
          mouseUpVolume(instance: AudioBarComponent){
            if(DragEvent.mouseDwnVolume == true){
              DragEvent.VolBar.calculateVolumePosition(instance, ViewTools.progressBars.volume.progress)
                DragEvent.mouseDwnVolume = false;
            }
          },
        
          mouseDownVolume(instance: AudioBarComponent){
            DragEvent.mouseDwnVolume = true;
          },
          calculateVolumePosition(instance: AudioBarComponent, coorY:number){
            if(OperationsTools.theme.audio){
              let vol = 
              (coorY / ViewTools.progressBars.volume.size > 1) 
                ? 1 
                : (coorY / ViewTools.progressBars.volume.size < 0.001)
                  ? 0
                  : coorY / ViewTools.progressBars.volume.size;
                  OperationsTools.theme.audio.volume = vol;
            }
          }
    }

}