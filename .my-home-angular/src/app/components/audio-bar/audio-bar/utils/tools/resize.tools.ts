import { AudioBarComponent } from "src/app/components/audio-bar/audio-bar/audio-bar.component";
import { MiscToolsProgress } from "./misc.tools";
import { Elements_Id } from "../variables/Bar-Variables";
import { ViewTools } from "./view.tools";
import { OperationsTools } from "./operations.tools";

export class ResizeTools{

    public static setInitialSize(): void{
        setTimeout(()=>{
            this.resizeProgress();
            this.resizeVol();
          }, 100);
    }

    public static screenResize(): void{
        window.onresize = ()=>{
            this.resizeProgress();
            this.resizeVol();
        }
    }

    protected static resizeProgress(): void{
        const progressBar = MiscToolsProgress.getElementById(Elements_Id.progress_bar);
        
        if(progressBar){
          const paddingLeft = MiscToolsProgress.cleanPxValue(progressBar.style.paddingLeft);
          const paddingRight = MiscToolsProgress.cleanPxValue(progressBar.style.paddingRight);
    
          ViewTools.progressBars.media.size = progressBar.offsetWidth - (paddingLeft + paddingRight);
          if(OperationsTools.theme.audio){
            const progressPercentage = ((OperationsTools.theme.audio.currentTime * 100 / OperationsTools.theme.audio.duration) / 100) * ViewTools.progressBars.media.size;
            ViewTools.progressBars.media.progress = progressPercentage;
          }
        }
    }

    protected static resizeVol(): void{
        const volBar = MiscToolsProgress.getElementById(Elements_Id.vol_bar);
        if(volBar){
          const paddingLeft = MiscToolsProgress.cleanPxValue(volBar.style.paddingLeft);
          const paddingRight = MiscToolsProgress.cleanPxValue(volBar.style.paddingRight);

          ViewTools.progressBars.volume.size = volBar.offsetWidth - (paddingLeft + paddingRight);
          if(OperationsTools.theme.audio){
            const volPercentage = OperationsTools.theme.audio.volume * ViewTools.progressBars.volume.size;
            ViewTools.progressBars.volume.progress = volPercentage;
          } 
        }
    }

}