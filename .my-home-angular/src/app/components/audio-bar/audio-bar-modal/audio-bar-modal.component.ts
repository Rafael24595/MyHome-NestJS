import { Component, Input, OnInit } from '@angular/core';
import { AudioBarComponent } from '../audio-bar/audio-bar.component';

@Component({
  selector: 'app-audio-bar-modal',
  templateUrl: './audio-bar-modal.component.html',
  styleUrls: ['./audio-bar-modal.component.css']
})
export class AudioBarModalComponent implements OnInit {

  @Input() AudioBarInstance: AudioBarComponent = new AudioBarComponent();

  static modalState = '';

  constructor() { }

  ngOnInit(): void {
    window.addEventListener("click", (event)=>{
      let element = event.target as HTMLElement;
      this.checkClickOutGear(element);
    });
  }

  checkClickOutGear(element: HTMLElement){
    if(element){
      if(element.id != 'button-container' && element.id != 'button-gear'){
        let parentElement = element.parentElement;
        if(parentElement){
          this.checkClickOutGear(parentElement)
        }
        else if(AudioBarModalComponent.modalState == 'show'){
          AudioBarModalComponent.showModal();
        }
      }
    }
  }

  static showModal(){
    AudioBarModalComponent.modalState = (AudioBarModalComponent.modalState == '') ? 'show' : '';
  }

}
