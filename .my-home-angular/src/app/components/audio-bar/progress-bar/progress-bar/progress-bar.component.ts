import { Component, OnInit } from '@angular/core';
import { BarUtils } from '../../audio-bar/utils/tools/audio-bar.tools';
import { MiscToolsProgress } from '../../audio-bar/utils/tools/misc.tools';
import { Elements_Id } from '../../audio-bar/utils/variables/Bar-Variables';
import { AbstractProgressBarComponent } from './abstract-progress-bar';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent extends AbstractProgressBarComponent implements OnInit {

  instance: ProgressBarComponent;

  audioPlaying: boolean = false;

  constructor(media: HTMLAudioElement) {
    super(media);
    this.instance = this;
  }

  ngOnInit(): void {
  }

  getInstance(media: HTMLAudioElement){
    if(!this.instance){
      this.instance = new ProgressBarComponent(media);
    }
    return this.instance;
  }

  resizeBar(audio: HTMLAudioElement): void{
    const progressBar = MiscToolsProgress.getElementById(Elements_Id.progress_bar);
    
    if(progressBar){
      const paddingLeft = MiscToolsProgress.cleanPxValue(progressBar.style.paddingLeft);
      const paddingRight = MiscToolsProgress.cleanPxValue(progressBar.style.paddingRight);

      this.size = progressBar.offsetWidth - (paddingLeft + paddingRight);
      if(audio){
        const progressPercentage = ((audio.currentTime * 100 / audio.duration) / 100) * this.size;
        this.progress = progressPercentage;
      }
    }
  }

  calculatePosition(coorY:number){
    this.media.currentTime = coorY * this.media.duration / this.size;
  }

  barDrag(event:MouseEvent | TouchEvent){
    let audioBarPosition = MiscToolsProgress.getElementById(Elements_Id.progress_bar_area);
    let position = (audioBarPosition) ? audioBarPosition.getBoundingClientRect().left : 0;
    event.preventDefault();
    const clientX = (event instanceof MouseEvent) ? event.clientX : event.changedTouches[0].clientX;
    if(clientX - position >= 0 && clientX - position <= this.size){
      const movement = BarUtils.positionInBar(clientX, audioBarPosition)
      this.progress = movement;
    }
  }

  mouseDrag(event:MouseEvent | TouchEvent){
    this.showTimePointer(event, this.media);
    if(this.mouseDown){
        this.barDrag(event);
    }
  }

  mouseUp(){
    this.calculatePosition(this.progress);
    (this.audioPlaying) ? this.media.play(): this.media.pause();
    this.mouseDown = false;
  }

  mouseDownBar(){
      this.audioPlaying = (this.media.paused) ? false : true; 
      this.media.pause();
      this.mouseDown = true;
  }

  public showTimePointer(event:MouseEvent | TouchEvent, media: HTMLAudioElement): void{
    let item:HTMLElement | string = event.target as HTMLElement;
    const itemId = item.id;
    const clientX = (event instanceof MouseEvent) ? event.clientX : event.changedTouches[0].clientX;
    item = (itemId == 'Meatball' && item.parentElement) ? item.parentElement : item;
    if((itemId == Elements_Id.progress_bar_area || itemId == 'Meatball') && event.type != 'touchend'){
      this.timeToolTip.display = 'block';
      const positionInPage = BarUtils.positionInBar(clientX, item);
      let time = BarUtils.calculeTimeByPixel(media, positionInPage, this.size);
      time = (time <= media.duration) ? time : media.duration;
      this.timeToolTip.value = BarUtils.getSeconds(time);
      this.timeToolTip.position = positionInPage;
    }
    else{
      this.timeToolTip.display = 'none';
    }
  }

}
