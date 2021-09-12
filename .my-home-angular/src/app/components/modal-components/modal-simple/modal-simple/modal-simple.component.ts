import { Component, OnInit } from '@angular/core';
import { ModalElementsInterface } from 'src/classes/Modal';
import { ModalBaseComponent, ModalStatus } from '../../modal-base.component';

@Component({
  selector: 'app-modal-simple',
  templateUrl: './modal-simple.component.html',
  styleUrls: ['./modal-simple.component.css']
})
export class ModalSimpleComponent implements OnInit {

  modal = ModalStatus;

  constructor() { }

  ngOnInit(): void {
    
  }

  closeModal(): void{
    ModalBaseComponent.cleanModal();
  }

  selectOption(element:ModalElementsInterface): void{ 
    if(element.funct)
      element.funct(element.params);
    if(element.click)
      this.closeModal();
  }

}
