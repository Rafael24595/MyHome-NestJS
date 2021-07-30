import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AudioBarComponent } from '../audio-bar/audio-bar.component';
import { ProgressBarListener } from '../audio-bar/utils/services/listener.service';
import { OperationsTools } from '../audio-bar/utils/tools/operations.tools';

@Component({
  selector: 'app-audio-bar-modal',
  templateUrl: './audio-bar-modal.component.html',
  styleUrls: ['./audio-bar-modal.component.css']
})
export class AudioBarModalComponent implements OnInit {

  @Input() AudioBarInstance: AudioBarComponent = new AudioBarComponent(new ProgressBarListener(), new ActivatedRoute());

  static modalState = '';
  Operations = OperationsTools;

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
