import { AudioBarComponent } from "src/app/components/audio-bar/audio-bar/audio-bar.component";
import { MiscTools } from "./misc.tools";
import { Elements_Id } from "./variables/Bar-Variables";
import { ViewTools } from "./view.tools";

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
    
          ViewTools.progressBars.media.size = progressBar.offsetWidth - (paddingLeft + paddingRight);
          if(instance.theme.audio){
            const progressPercentage = ((instance.theme.audio.currentTime * 100 / instance.theme.audio.duration) / 100) * ViewTools.progressBars.media.size;
            ViewTools.progressBars.media.progress = progressPercentage;
          }
        }
    }

    protected static resizeVol(instance: AudioBarComponent): void{
        const volBar = MiscTools.getElementById(Elements_Id.vol_bar);
        if(volBar){
          const paddingLeft = MiscTools.cleanPxValue(volBar.style.paddingLeft);
          const paddingRight = MiscTools.cleanPxValue(volBar.style.paddingRight);

          ViewTools.progressBars.volume.size = volBar.offsetWidth - (paddingLeft + paddingRight);
          if(instance.theme.audio){
            const volPercentage = instance.theme.audio.volume * ViewTools.progressBars.volume.size;
            ViewTools.progressBars.volume.progress = volPercentage;
          } 
        }
    }

}