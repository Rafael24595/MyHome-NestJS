import { AudioBarComponent } from "src/app/components/audio-bar/audio-bar/audio-bar.component";
import { MiscTools } from "./misc.tools";
import { Elements_Id } from "./variables/Bar-Variables";

export class ResizeTools{

    public static setInitialSize(instance: AudioBarComponent): void{
        setTimeout(()=>{
            this.resizeProgress(instance);
            this.resizeVol(instance);
          }, 100);
    }

    public static screenResize(instance: AudioBarComponent): void{
        window.onresize = ()=>{
            this.resizeProgress(instance);
            this.resizeVol(instance);
        }
    }

    protected static resizeProgress(instance: AudioBarComponent): void{
        const progressBar = MiscTools.getElementById(Elements_Id.progress_bar);
        
        if(progressBar){
          const paddingLeft = MiscTools.cleanPxValue(progressBar.style.paddingLeft);
          const paddingRight = MiscTools.cleanPxValue(progressBar.style.paddingRight);
    
          instance.barAudioSize = progressBar.offsetWidth - (paddingLeft + paddingRight);
          if(instance.audio){
            const progressPercentage = ((instance.audio.currentTime * 100 / instance.audio.duration) / 100) * instance.barAudioSize;
    
            instance.pointAudioPosition = progressPercentage;
            instance.barAudioSizeProgress = progressPercentage;
          }
        }
    }

    protected static resizeVol(instance: AudioBarComponent): void{
        const volBar = MiscTools.getElementById(Elements_Id.vol_bar);
        if(volBar){
          const paddingLeft = MiscTools.cleanPxValue(volBar.style.paddingLeft);
          const paddingRight = MiscTools.cleanPxValue(volBar.style.paddingRight);

          instance.barVolumeSize = volBar.offsetWidth - (paddingLeft + paddingRight);
          if(instance.audio){
            const volPercentage = instance.audio.volume * instance.barVolumeSize;
          
            instance.pointVolumePosition = volPercentage; 
            instance.barVolumeSizeProgress = volPercentage;
          } 
        }
    }

}