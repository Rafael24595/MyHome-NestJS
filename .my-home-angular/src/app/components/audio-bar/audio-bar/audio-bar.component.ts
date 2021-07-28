import { Component, OnInit, Input } from '@angular/core';
import { BarThemesListInterface } from '../../../../utils/tools/audio-bar-tools/interfaces/Bar-Themes-List';
import { AudiobufferToWav } from '../../../../utils/tools/audio-bar-tools/AudionufferToWav';
import { BarUtils } from '../../../../utils/tools/audio-bar-tools/audio-bar.tools';
import { Color_Vars } from '../../../../utils/tools/audio-bar-tools/variables/Bar-Variables';
import { service_config } from 'src/utils/variables/Globals';
import { ResizeTools } from 'src/utils/tools/audio-bar-tools/resize.tools';
import { ViewTools } from 'src/utils/tools/audio-bar-tools/view.tools';
import { DragEvent } from 'src/utils/tools/audio-bar-tools/drag.event.tool';

@Component({
  selector: 'app-audio-bar',
  templateUrl: './audio-bar.component.html',
  styleUrls: ['./audio-bar.component.css']
})
export class AudioBarComponent implements OnInit {

  @Input() ajustableWidth: boolean = true;

  constructor() {
  }

  ngOnInit(): void {

    this.prepareTheme({id:'data//media/video/Anything goes by cole porter.mp3', name:'Anything goes by cole porter', views:0});
    
    window.addEventListener("click", (event)=>{
      let element = event.target as HTMLElement;
      this.checkClickOutGear(element);
    });

    ResizeTools.setInitialSize(this);
    ResizeTools.screenResize(this);

  }

  ngOnDestroy() {
    if(this.audio){
      this.audio.pause();
    }
  }

  checkClickOutGear(element: HTMLElement){
    if(element){
      if(element.id != 'button-gear-container'){
        let parentElement = element.parentElement;
        if(parentElement){
          this.checkClickOutGear(parentElement)
        }
        else if(this.buttonContainerState == 'show'){
          this.showButtonContainer();
        }
      }
    }
  }

  buttonContainerState = '';

  showButtonContainer(){
    this.buttonContainerState = (this.buttonContainerState == '') ? 'show' : '';
  }
  
  /*/////////////
  | THEMES VARS |
  /////////////*/

  mediaPath:string = `${service_config.connection.protocol}://${service_config.connection.host}:${service_config.connection.port}/api/file`;
  filePath: string = '';
  lineToolBar:boolean = true;
  isThemeList:Boolean = false;
  audio: HTMLAudioElement | undefined;
  themesList:BarThemesListInterface[] = [];
  themesListRandom:BarThemesListInterface[] = [];
  themesListActive:BarThemesListInterface[] = this.themesList;
  themeName = '';
  isView = false;
  lastTime:number = 0;
  position = 0;
  randomList = false;
  loopList = false;
  launchPaused = true;
  normalSrc = '';
  reverseSrc = '';
  playLogo = '!';
  gearShow = false;

  /*////////////
  | AUDIO VARS |
  ////////////*/

  barAudioSize = 0;
  barAudioSizeProgress = 0
  pointAudioPosition = 0;
  speed = 1; 
  time = '00:00';
  maxTime = '00:00';
  overBar = 'none'
  timePointer = this.time;
  timePointerPosition = 0;
  audioStatus = true;
  mouseDwnAudio = false;
  isReverse = false;

  /*/////////////
  | VOlUME VARS |
  /////////////*/

  barVolumeSize = 100;
  barVolumeSizeProgress = this.barVolumeSize;
  pointVolumePosition = this.barVolumeSize;
  mouseDwnVolume = false;
  volLogo = Color_Vars.volume_logo.percentage_75;
  //vol = '100%';

  /*////////////
  | COLOR VARS |
  ////////////*/

  loadGif = Color_Vars.load_gif_status.hidden;
  playButtonColor = Color_Vars.button_play_color.pause;
  barColor = Color_Vars.bar_progress_color.pause;
  barVolColorBack = Color_Vars.bar_volume_color.background.unmuted;
  barVolColor = Color_Vars.bar_volume_color.front.unmuted;
  babyMeatballColor = Color_Vars.meatball_color.baby.unmuted;
  muteColor = Color_Vars.button_mute_color.unmuted;
  loopColor = Color_Vars.button_loop_color.normal;
  randomColor = Color_Vars.button_random_color.normal;
  loopListColor = Color_Vars.button_loop_list_color.normal;
  reverseColor = Color_Vars.button_reverse_color.normal;

  /////////////////////////
  //PREPARATION FUNCTIONS//
  /////////////////////////

  prepareTheme(theme?:BarThemesListInterface){

      if(theme){
        this.isReverse =  false;
        this.reverseSrc = '';
        this.normalSrc = `${this.mediaPath}/${theme.id}`;
      }
      
      if(this.audio) {this.audio.pause();}
      this.themeName = theme?.name as string;
      this.audio = new Audio();
      this.audio.src = (this.isReverse) ? this.reverseSrc : this.normalSrc;
      this.audio.classList.add('reproductor-audio');
      this.audio.load();
      this.audio.onloadedmetadata = ()=>{
        if(this.audio){
          this.audio.onloadeddata = ()=>{
            if(this.audio){
              this.audio.onpause = ()=>{ViewTools.setPlay(this)}
              this.audio.onplay = ()=>{ViewTools.setPlay(this)}
              this.audio.onvolumechange = ()=>{this.progressBarVolume()};
              this.audio.ontimeupdate = ()=>{ViewTools.progressBarAudio(this)}
              this.audio.onended = ()=>{this.calculeNextThemePosition(1)}
      
              this.setDefaultThemeValues();
              ViewTools.setDefaultInterfaceValues(this);
            }
          }
        }
      }
      this.audio.onerror = (err)=>{this.audio = undefined; console.error(`Error: ${err.toString()}`)};
  }

  //////////////////////////
  //REPRODUCTION FUNCTIONS//
  //////////////////////////

  setPlayPause(mode?:string){
    if(!this.audio && this.themesList){
      this.prepareTheme(this.themesList[this.position])
    }
    if(this.audio){
      if(this.audio.paused || mode == 'play'){
        this.audio.play();
      }
      else if(!this.audio.paused || mode == 'stop'){
        this.audio.pause();
      }
    }
  }

  setDefaultThemeValues(){

    let muted = localStorage.getItem('isMuted');
    let loop = localStorage.getItem('isLoop');
    let volume = localStorage.getItem('volVal');
    let velocity = localStorage.getItem('velVal');
    let listLoop = localStorage.getItem('isListLoop');
    let listRandom = localStorage.getItem('isListRandom');

    if(this.audio){
      this.selectVelocity();
      this.audio.muted = (muted) ? JSON.parse(muted) : this.audio.muted;
      this.audio.loop = (loop) ? JSON.parse(loop) : this.audio.loop;
      this.audio.volume = (volume) ? JSON.parse(volume) : this.audio.volume;
      this.audio.playbackRate = (velocity) ? JSON.parse(velocity) : this.audio.playbackRate;
      this.loopList = (listLoop) ? JSON.parse(listLoop) : false;
      this.randomList = (listRandom) ? JSON.parse(listRandom) : false;

      (this.audio && !this.launchPaused) ? this.audio.play() : '';

    }

  }

  loopListReproduction(){
    this.loopList = !this.loopList;
    ViewTools.setLoopList(this);
    localStorage.setItem('isListLoop', JSON.stringify(this.loopList));
  }

  loopAudio(){
    if(this.audio){
      this.audio.loop = !this.audio.loop;
      ViewTools.setLoopAudio(this);
      localStorage.setItem('isLoop', JSON.stringify(this.audio.loop));
    }
  }

  randomReproduction(){
    this.randomList = !this.randomList;
    if(this.randomList){
      this.themesListRandom = BarUtils.randomizeList(this.themesList, this.position);
      this.position = 0;
      this.themesListActive = this.themesListRandom;
    }
    else{
      this.position = BarUtils.findActualPosition(this.themesListActive, this.position, this.themesList);
      this.themesListActive = this.themesList;
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
        action = (this.position + action < 0) ? this.themesListActive.length -1 : (this.position + action > this.themesList.length -1) ? 0 : this.position + action;
        this.launchPaused = false;
      }
      else{
        (this.position + action < 0) ? 
          (action = 0, this.launchPaused = true) : 
          (this.position + action > this.themesListActive.length -1) ? 
            (action = this.themesListActive.length -1, this.launchPaused = true) : 
            (action = this.position + action, this.launchPaused = false);
      }
    }
    if(isCalculed){
      action = event as number;
    }
    this.position = action;
    this.prepareTheme(this.themesListActive[this.position]);
  }

  calculeTimeByPixel(position:number){
    if(this.audio){
      let timeTotal = this.audio.duration
      return position * timeTotal / this.barAudioSize ;
    }
    return 0;
  }

  calculeTimeBySeconds(position?:number){
    if(this.audio){
      let timeActual = (position) ? position : this.audio.currentTime;
      let timeTotal = this.audio.duration;
      return timeActual * this.barAudioSize / timeTotal;
    }
    return 0;
  }

  calculateAudioPosition(coorY:number){
    if(this.audio){
      this.audio.currentTime = coorY * this.audio.duration / this.barAudioSize;
    }
  }

  calculateVolumePosition(coorY:number){
    if(this.audio){
      let vol = 
      (coorY / this.barVolumeSize > 1) 
        ? 1 
        : (coorY / this.barVolumeSize < 0.001)
          ? 0
          : coorY / this.barVolumeSize;
      this.audio.volume = vol;
    }
  }

  //////////////////////
  //MULTIBAR FUNCTIONS//
  //////////////////////

  ToClick = DragEvent.toClick;
  DragEvent = DragEvent.mouseDrag;
  DragProgress = DragEvent.ProgressBar;
  DragVolume = DragEvent.VolBar;

  ////////////////////
  //VOLUME FUNCTIONS//
  ////////////////////

  progressBarVolume(){
    if(this.audio){
      let volActual = this.audio.volume;
      let movement = volActual * this.barVolumeSize;
      this.pointVolumePosition = movement;
      this.barVolumeSizeProgress = movement;

      ViewTools.setMuted(this);
      ViewTools.setVolLogo(this);
      localStorage.setItem('volVal', JSON.stringify(this.audio.volume));
    }
  }

  muteVol(){
    if(this.audio){
      this.audio.muted = !this.audio.muted;
      localStorage.setItem('isMuted', JSON.stringify(this.audio.muted));
    }
  }

  ///////////////////
  // BAR FUNCTIONS //
  ///////////////////

  selectVelocity(){
    if(this.audio){
      this.speed = this.audio.playbackRate;
    }
  }

  updateSpeed(){
    if(this.audio){
      this.audio.playbackRate = this.speed;
      localStorage.setItem('velVal', JSON.stringify(this.audio.playbackRate));
    }
  }

  /////////////////////
  // BETA FUNCTIONS //
  ////////////////////

  revertAudioImplement(){
    if(this.audio){
      this.loadGif = Color_Vars.load_gif_status.visible;
      this.audioStatus = (this.audio.paused) ? false : true;

      if(this.audio.src != this.reverseSrc){
        this.audio.pause();
        (this.reverseSrc == '')
          ? this.revertAudio(this.audio.src).then(()=>{this.isReverse = true; this.switchSRC()})
          : (this.isReverse = true, this.switchSRC()) ;  
      }
      else{
        this.isReverse = false;
        this.switchSRC();
      }
    }
  }

  switchSRC(){

    if(this.audio){
      if(this.isReverse){

        this.loadGif = Color_Vars.load_gif_status.hidden;
        let time = this.audio.duration - this.audio.currentTime;
        this.prepareTheme();
        this.audio.currentTime = time;
        this.audio.play();
  
      }else{
  
        this.loadGif = Color_Vars.load_gif_status.hidden;
        let time = this.audio.duration - this.audio.currentTime;
        this.prepareTheme();
        this.audio.currentTime = time;
  
      }
  
      ViewTools.setReverse(this);
      (this.audioStatus) ? this.audio.play() : this.audio.pause();
      this.audioStatus = (this.audio.paused) ? false : true; 
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
