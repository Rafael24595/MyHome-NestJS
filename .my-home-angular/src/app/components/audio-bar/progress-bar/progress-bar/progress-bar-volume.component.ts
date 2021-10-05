import { Component, OnInit } from '@angular/core';
import { BarUtils } from '../../audio-bar/utils/tools/audio-bar.tools';
import { MiscToolsProgress } from '../../audio-bar/utils/tools/misc.tools';
import { Elements_Id } from '../../audio-bar/utils/variables/Bar-Variables';
import { AbstractProgressBarComponent } from './abstract-progress-bar';

@Component({
  selector: 'app-progress-bar-volume',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarVolumeComponent extends AbstractProgressBarComponent implements OnInit {

  instance: ProgressBarVolumeComponent;

  ngOnInit(): void {
  }

  constructor(media: HTMLAudioElement) {
    super(media);
    this.instance = this;
  }

  getInstance(media: HTMLAudioElement){
    if(!this.instance){
      this.instance = new ProgressBarVolumeComponent(media);
    }
    return this.instance;
  }

  public resizeBar(): void{
    const volBar = MiscToolsProgress.getElementById(Elements_Id.vol_bar);
    if(volBar){
      const paddingLeft = MiscToolsProgress.cleanPxValue(volBar.style.paddingLeft);
      const paddingRight = MiscToolsProgress.cleanPxValue(volBar.style.paddingRight);

      this.size = volBar.offsetWidth - (paddingLeft + paddingRight);

      const volPercentage = this.media.volume * this.size;
      this.progress = volPercentage;

    }
  }

  barDrag(event:MouseEvent | TouchEvent){
    const volBarPosition = MiscToolsProgress.getElementById(Elements_Id.vol_bar_small);
    const clientX = (event instanceof MouseEvent) ? event.clientX : event.changedTouches[0].clientX;
    const position = BarUtils.positionInBar(clientX, volBarPosition);
    event.preventDefault();

    if(position >= -1 && position <= this.size + 1){
      this.progress = position;
    }
    this.calculatePosition(this.progress);
  }

  mouseUpVolume(){
    if(this.mouseDown == true){
        this.calculateVolumePosition(this.progress)
        this.mouseDown = false;
    }
  }

  mouseDownVolume(){
    this.mouseDown = true;
  }

  calculateVolumePosition(coorY:number){
      let vol = 
      (coorY / this.size > 1) 
      ? 1 
      : (coorY / this.size < 0.001)
          ? 0
          : coorY / this.size;
          this.media.volume = vol;
  }

}
