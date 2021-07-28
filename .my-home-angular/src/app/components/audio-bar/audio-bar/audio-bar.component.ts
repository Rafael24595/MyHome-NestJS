import { Component, OnInit, Input } from '@angular/core';
import { AudiobufferToWav } from '../../../../utils/tools/audio-bar-tools/AudionufferToWav';
import { BarUtils } from '../../../../utils/tools/audio-bar-tools/audio-bar.tools';
import { Color_Vars, Icons, Media } from '../../../../utils/tools/audio-bar-tools/variables/Bar-Variables';
import { ResizeTools } from 'src/utils/tools/audio-bar-tools/resize.tools';
import { ViewTools } from 'src/utils/tools/audio-bar-tools/view.tools';
import { DragEvent } from 'src/utils/tools/audio-bar-tools/drag.event.tool';
import { AudioBarModalComponent } from '../audio-bar-modal/audio-bar-modal.component';
import { Theme } from 'src/classes/File/Theme';
import { LocalStorage } from 'src/utils/tools/audio-bar-tools/variables/storage.const';
import { MiscTools } from 'src/utils/tools/audio-bar-tools/misc.tools';

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

  constructor() {
  }

  ngOnInit(): void {
    this.prepareTheme(new Theme('', '/media/video/Anything goes by cole porter.mp3', '', {id: '', name: ''}, 0, 0, []));
    ResizeTools.setInitialSize(this);
    ResizeTools.screenResize(this);
  }

  ngOnDestroy() {
    if(this.theme.audio) this.theme.audio.pause();
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

  /////////////////////////
  //PREPARATION FUNCTIONS//
  /////////////////////////

  prepareTheme(theme?:Theme){

    let src = ''; 

    if(theme){
      this.isReverse =  false;
      this.reverseSrc = '';
      src = `${Media.path}/${theme.path}`;
      this.theme.data = theme;
    }
    else{
      src = (this.isReverse) ? this.reverseSrc : this.theme.data.path;
    }
    
    if(this.theme.audio) {this.theme.audio.pause();}
    this.theme.audio = new Audio();
    this.theme.audio.src = src;
    this.theme.audio.classList.add('reproductor-audio');
    this.theme.audio.load();
    this.theme.audio.onloadedmetadata = ()=>{
      if(this.theme.audio){
        this.theme.audio.onloadeddata = ()=>{
          if(this.theme.audio){
            this.theme.audio.onpause = ()=>{ViewTools.setPlay(this)}
            this.theme.audio.onplay = ()=>{ViewTools.setPlay(this)}
            this.theme.audio.onvolumechange = ()=>{ViewTools.progressBarVolume(this)};
            this.theme.audio.ontimeupdate = ()=>{ViewTools.progressBarAudio(this)}
            this.theme.audio.onended = ()=>{this.calculeNextThemePosition(1)}
    
            this.setDefaultThemeValues();
            ViewTools.setDefaultInterfaceValues(this);
          }
        }
      }
    }
    this.theme.audio.onerror = (err)=>{this.theme.audio = undefined; console.error(`Error: ${err.toString()}`)};
  }

  //////////////////////////
  //REPRODUCTION FUNCTIONS//
  //////////////////////////

  setPlayPause(mode?:string){
    if(this.theme.audio){
      if(this.theme.audio.paused || mode == 'play'){
        this.theme.audio.play();
      }
      else if(!this.theme.audio.paused || mode == 'stop'){
        this.theme.audio.pause();
      }
    }
    else if(mode != 'stop' && this.themesLists.active){
      this.prepareTheme(this.themesLists.active[this.themesLists.position]);
    }
  }

  setDefaultThemeValues(){

    let muted = localStorage.getItem('isMuted');
    let loop = localStorage.getItem('isLoop');
    let volume = MiscTools.getLocalStorage(LocalStorage.volume_status);
    let velocity = localStorage.getItem('velVal');
    let listLoop = localStorage.getItem('isListLoop');
    let listRandom = localStorage.getItem('isListRandom');

    if(this.theme.audio){
      this.selectVelocity();
      this.theme.audio.muted = (muted) ? JSON.parse(muted) : this.theme.audio.muted;
      this.theme.audio.loop = (loop) ? JSON.parse(loop) : this.theme.audio.loop;
      this.theme.audio.volume = (volume) ? JSON.parse(volume) : this.theme.audio.volume;
      this.theme.audio.playbackRate = (velocity) ? JSON.parse(velocity) : this.theme.audio.playbackRate;
      this.loopList = (listLoop) ? JSON.parse(listLoop) : false;
      this.randomList = (listRandom) ? JSON.parse(listRandom) : false;

      (this.theme.audio && !this.launchPaused) ? this.theme.audio.play() : '';

    }

  }

  loopListReproduction(){
    this.loopList = !this.loopList;
    ViewTools.setLoopList(this);
    localStorage.setItem('isListLoop', JSON.stringify(this.loopList));
  }

  loopAudio(){
    if(this.theme.audio){
      this.theme.audio.loop = !this.theme.audio.loop;
      ViewTools.setLoopAudio(this);
      localStorage.setItem('isLoop', JSON.stringify(this.theme.audio.loop));
    }
  }

  randomReproduction(){
    this.randomList = !this.randomList;
    if(this.randomList){
      this.themesLists.random = BarUtils.randomizeList(this.themesLists.normal, this.themesLists.position);
      this.themesLists.position = 0;
      this.themesLists.active = this.themesLists.random;
    }
    else{
      this.themesLists.position = BarUtils.findActualPosition(this.themesLists.active, this.themesLists.position, this.themesLists.normal);
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
    this.prepareTheme(this.themesLists.active[this.themesLists.position]);
  }

  calculeTimeByPixel(position:number){
    if(this.theme.audio){
      let timeTotal = this.theme.audio.duration
      return position * timeTotal / ViewTools.progressBars.media.size;
    }
    return 0;
  }

  calculeTimeBySeconds(position?:number){
    if(this.theme.audio){
      let timeActual = (position) ? position : this.theme.audio.currentTime;
      let timeTotal = this.theme.audio.duration;
      return timeActual * ViewTools.progressBars.media.size / timeTotal;
    }
    return 0;
  }

  calculateAudioPosition(coorY:number){
    if(this.theme.audio){
      this.theme.audio.currentTime = coorY * this.theme.audio.duration / ViewTools.progressBars.media.size;
    }
  }

  calculateVolumePosition(coorY:number){
    if(this.theme.audio){
      let vol = 
      (coorY / ViewTools.progressBars.volume.size > 1) 
        ? 1 
        : (coorY / ViewTools.progressBars.volume.size < 0.001)
          ? 0
          : coorY / ViewTools.progressBars.volume.size;
      this.theme.audio.volume = vol;
    }
  }

  ////////////////////
  //VOLUME FUNCTIONS//
  ////////////////////

  muteVol(){
    if(this.theme.audio){
      this.theme.audio.muted = !this.theme.audio.muted;
      localStorage.setItem('isMuted', JSON.stringify(this.theme.audio.muted));
    }
  }

  ///////////////////
  // BAR FUNCTIONS //
  ///////////////////

  selectVelocity(){
    if(this.theme.audio){
      this.speed = this.theme.audio.playbackRate;
    }
  }

  updateSpeed(){
    if(this.theme.audio){
      this.theme.audio.playbackRate = this.speed;
      localStorage.setItem('velVal', JSON.stringify(this.theme.audio.playbackRate));
    }
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
        this.prepareTheme();
        this.theme.audio.currentTime = time;
        this.theme.audio.play();
  
      }else{
  
        this.loadGif = Color_Vars.load_gif_status.hidden;
        let time = this.theme.audio.duration - this.theme.audio.currentTime;
        this.prepareTheme();
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
