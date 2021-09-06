import { Component, OnInit, Input } from '@angular/core';
import { AudiobufferToWav } from './utils/tools/AudionufferToWav';
import { Color_Vars } from './utils/variables/Bar-Variables';
import { ResizeTools } from './utils/tools/resize.tools';
import { ViewTools } from './utils/tools/view.tools';
import { DragEvent } from './utils/tools/drag.event.tool';
import { AudioBarModalComponent } from '../audio-bar-modal/audio-bar-modal.component';
import { ProgressBarListener } from './utils/services/listener.service';
import { ActivatedRoute } from '@angular/router';
import { OperationsTools } from './utils/tools/operations.tools';
import { ReproductionTools } from './utils/tools/reproduction.tools';
import { InterfaceTools } from './utils/tools/interface.tools';

@Component({
  selector: 'app-audio-bar',
  templateUrl: './audio-bar.component.html',
  styleUrls: ['./audio-bar.component.css']
})
export class AudioBarComponent implements OnInit {

  @Input() ajustableWidth: boolean = true;

  destroySession = true;

  ToClick = DragEvent.toClick;
  DragEvent = DragEvent.mouseDrag;
  DragProgress = DragEvent.ProgressBar;
  DragVolume = DragEvent.VolBar;

  AudioBarModal = AudioBarModalComponent;

  ViewResources = ViewTools.viewStatus;
  ProgressBars = ViewTools.progressBars;
  ButtonsColor = ViewTools.buttonsColor;

  Interface = InterfaceTools;

  Operations = OperationsTools;
  Reproduction = ReproductionTools;

  progressBarListener: ProgressBarListener;
  route: ActivatedRoute

  constructor(progressBarListener: ProgressBarListener, route: ActivatedRoute) {
    this.progressBarListener = progressBarListener;
    this.route = route;
  }

  ngOnInit(): void {
    ViewTools.showLite = 'hidden';
    ResizeTools.setInitialSize();
    ResizeTools.screenResize();
    OperationsTools.setInitialValues(this);
  }

  ngOnDestroy() {
    if(this.destroySession){
      OperationsTools.destroyComponent(this);
    }
    else{
      ViewTools.showLite = 'visible';
      OperationsTools.progressBarUnsubscribe(this);
    }
  }
  
  setDestroySession(mode: boolean): void{
    this.destroySession = mode; 
  }

  /////////////////////
  // BETA FUNCTIONS //
  ////////////////////

  reverseSrc = '';

  revertAudioImplement(){
    if(OperationsTools.theme.audio){
      ViewTools.buttonsColor.loadGif = Color_Vars.load_gif_status.visible;
      OperationsTools.audioPlaying = (OperationsTools.theme.audio.paused) ? false : true;

      if(OperationsTools.theme.audio.src != this.reverseSrc){
        OperationsTools.theme.audio.pause();
        (this.reverseSrc == '')
          ? this.revertAudio(OperationsTools.theme.audio.src).then(()=>{OperationsTools.isReverse = true; this.switchSRC()})
          : (OperationsTools.isReverse = true, this.switchSRC()) ;  
      }
      else{
        OperationsTools.isReverse = false;
        this.switchSRC();
      }
    }
  }

  switchSRC(){

    if(OperationsTools.theme.audio){
      if(OperationsTools.isReverse){
        ViewTools.buttonsColor.loadGif = Color_Vars.load_gif_status.hidden;
        let time = OperationsTools.theme.audio.duration - OperationsTools.theme.audio.currentTime;
        OperationsTools.prepareTheme(this);
        OperationsTools.theme.audio.currentTime = time;
        OperationsTools.theme.audio.play();
  
      }else{
        ViewTools.buttonsColor.loadGif = Color_Vars.load_gif_status.hidden;
        let time = OperationsTools.theme.audio.duration - OperationsTools.theme.audio.currentTime;
        OperationsTools.prepareTheme(this);
        OperationsTools.theme.audio.currentTime = time;
  
      }
  
      ViewTools.setReverse();
      (OperationsTools.audioPlaying) ? OperationsTools.theme.audio.play() : OperationsTools.theme.audio.pause();
      OperationsTools.audioPlaying = (OperationsTools.theme.audio.paused) ? false : true; 
    }

  }

  revertAudio(src:string) {
    
    return new Promise(resolve=>{

      var context = new AudioContext();
      var xhr = new XMLHttpRequest(),
      method = "GET",
      url = src;

      xhr.open(method, url, true);
      xhr.responseType = 'arraybuffer';
      xhr.onreadystatechange = ()=> this.xhrReady(xhr, context).then(()=>resolve(true));
      xhr.send();

    })

  }

  xhrReady(xhr: { readyState: number; status: number; response: any; }, context: { decodeAudioData: (arg0: any, arg1: (buffer: any) => void) => void; createBufferSource: () => any; }){

    return new Promise(resolve=>{

      if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        context.decodeAudioData(xhr.response, (buffer)=>{
          var src = context.createBufferSource();
          Array.prototype.reverse.call(buffer.getChannelData(0));
          Array.prototype.reverse.call(buffer.getChannelData(1));
          src.buffer = buffer;
  
          var wav = AudiobufferToWav.audioBufferToWav(buffer);
          let blob = new Blob([wav],{type:'mp3'});
          let blobUrl = URL.createObjectURL(blob);
  
          this.reverseSrc = blobUrl;
  
          resolve(true);
          
        });
      }

    });

  }

}
