import { Component, OnInit, Input } from '@angular/core';
import { AudiobufferToWav } from './utils/tools/AudionufferToWav';
import { BarUtils } from './utils/tools/audio-bar.tools';
import { Color_Vars } from './utils/variables/Bar-Variables';
import { ResizeTools } from './utils/tools/resize.tools';
import { ViewTools } from './utils/tools/view.tools';
import { DragEvent } from './utils/tools/drag.event.tool';
import { AudioBarModalComponent } from '../audio-bar-modal/audio-bar-modal.component';
import { Theme } from 'src/classes/File/Theme';
import { ProgressBarListener } from './utils/services/listener.service';
import { ActivatedRoute } from '@angular/router';
import { OperationsTools } from './utils/tools/operations.tools';

@Component({
  selector: 'app-audio-bar',
  templateUrl: './audio-bar.component.html',
  styleUrls: ['./audio-bar.component.css']
})
export class AudioBarComponent implements OnInit {

  @Input() ajustableWidth: boolean = true;

  ToClick = DragEvent.toClick;
  DragEvent = DragEvent.mouseDrag;
  DragProgress = DragEvent.ProgressBar;
  DragVolume = DragEvent.VolBar;

  AudioBarModal = AudioBarModalComponent;

  ViewResources = ViewTools.viewStatus;
  ProgressBars = ViewTools.progressBars;

  Operations = OperationsTools;

  progressBarListener: ProgressBarListener;
  route: ActivatedRoute

  constructor(progressBarListener: ProgressBarListener, route: ActivatedRoute) {
    this.progressBarListener = progressBarListener;
    this.route = route;
  }

  ngOnInit(): void {
    ResizeTools.setInitialSize(this);
    ResizeTools.screenResize(this);
    OperationsTools.setInitialValues(this);
  }

  ngOnDestroy() {
    OperationsTools.destroyComponent(this);
  }
  
  /*/////////////
  | THEMES VARS |
  /////////////*/

  theme: {audio: HTMLAudioElement | undefined, data: Theme} = {
    audio: new Audio(),
    data: Theme.getEmptyTheme(),
  }
  themesLists: {normal: Theme[],random: Theme[],active: Theme[], position: number} = {
    normal: [],
    random: [],
    active: [],
    position: 0
  }
  randomList = false;
  loopList = false;
  launchPaused = true;
  reverseSrc = '';

  /*////////////
  | AUDIO VARS |
  ////////////*/

  speed = 1; 
  timePointerPosition = 0;
  audioStatus = true;
  isReverse = false;

  /*////////////
  | COLOR VARS |
  ////////////*/

  loadGif = Color_Vars.load_gif_status.hidden;
  barColor = Color_Vars.bar_progress_color.pause;
  barVolColorBack = Color_Vars.bar_volume_color.background.unmuted;
  barVolColor = Color_Vars.bar_volume_color.front.unmuted;
  babyMeatballColor = Color_Vars.meatball_color.baby.unmuted;
  muteColor = Color_Vars.button_mute_color.unmuted;
  loopColor = Color_Vars.button_loop_color.normal;
  randomColor = Color_Vars.button_random_color.normal;
  loopListColor = Color_Vars.button_loop_list_color.normal;
  reverseColor = Color_Vars.button_reverse_color.normal;

  //////////////////////////
  //REPRODUCTION FUNCTIONS//
  //////////////////////////

  randomReproduction(){
    this.randomList = !this.randomList;
    if(this.randomList){
      this.themesLists.random = BarUtils.randomizeList(this.themesLists.normal, this.themesLists.position);
      this.themesLists.position = 0;
      this.themesLists.active = this.themesLists.random;
    }
    else{
      this.themesLists.position = BarUtils.findThemePositionInListById(this.themesLists.active, this.themesLists.position, this.themesLists.normal);
      this.themesLists.active = this.themesLists.normal;
    }
    ViewTools.setRandomList(this);
    localStorage.setItem('isListRandom', JSON.stringify(this.randomList));
  }

  ///////////////////
  //TOOLS FUNCTIONS//
  ///////////////////

  calculeNextThemePosition(event:Event | number, isCalculed?: boolean){
      let action:HTMLInputElement | number = -1;
      if(event && !isCalculed){
        if(typeof event != 'number' && event.target){
          action = event.target as HTMLInputElement;
          action = parseInt(action.value);
        }
        else if(typeof event == 'number'){
          action = event;
        }
        if(this.loopList){
          action = (this.themesLists.position + action < 0) ? this.themesLists.active.length -1 : (this.themesLists.position + action > this.themesLists.normal.length -1) ? 0 : this.themesLists.position + action;
          this.launchPaused = false;
        }
        else{
          (this.themesLists.position + action < 0) ? 
            (action = 0, this.launchPaused = true) : 
            (this.themesLists.position + action > this.themesLists.active.length -1) ? 
              (action = this.themesLists.active.length -1, this.launchPaused = true) : 
              (action = this.themesLists.position + action, this.launchPaused = false);
        }
      }
      if(isCalculed){
        action = event as number;
      }
      this.themesLists.position = action;
      OperationsTools.prepareTheme(this, this.themesLists.active[this.themesLists.position]);
  }

  /////////////////////
  // BETA FUNCTIONS //
  ////////////////////

  revertAudioImplement(){
    if(this.theme.audio){
      this.loadGif = Color_Vars.load_gif_status.visible;
      this.audioStatus = (this.theme.audio.paused) ? false : true;

      if(this.theme.audio.src != this.reverseSrc){
        this.theme.audio.pause();
        (this.reverseSrc == '')
          ? this.revertAudio(this.theme.audio.src).then(()=>{this.isReverse = true; this.switchSRC()})
          : (this.isReverse = true, this.switchSRC()) ;  
      }
      else{
        this.isReverse = false;
        this.switchSRC();
      }
    }
  }

  switchSRC(){

    if(this.theme.audio){
      if(this.isReverse){

        this.loadGif = Color_Vars.load_gif_status.hidden;
        let time = this.theme.audio.duration - this.theme.audio.currentTime;
        OperationsTools.prepareTheme(this);
        this.theme.audio.currentTime = time;
        this.theme.audio.play();
  
      }else{
  
        this.loadGif = Color_Vars.load_gif_status.hidden;
        let time = this.theme.audio.duration - this.theme.audio.currentTime;
        OperationsTools.prepareTheme(this);
        this.theme.audio.currentTime = time;
  
      }
  
      ViewTools.setReverse(this);
      (this.audioStatus) ? this.theme.audio.play() : this.theme.audio.pause();
      this.audioStatus = (this.theme.audio.paused) ? false : true; 
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
