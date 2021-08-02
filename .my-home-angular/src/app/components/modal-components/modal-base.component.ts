import { Component, OnInit } from '@angular/core';
import { Modal } from 'src/classes/Modal';

export let ModalStatus: {showModal: boolean, modalType: string, options: boolean, modalDataSimple: Modal} = {
  showModal: false,
  modalType: '',
  options: true,
  modalDataSimple: Modal.getEmptyModal(),
}

@Component({
  selector: 'app-modal-base',
  templateUrl: './modal-base.component.html',
  styleUrls: ['./modal-base.component.css']
})
export class ModalBaseComponent implements OnInit {

  modal = ModalStatus;
  static modalTypes = {
    simple: 'simple'
  }
  
  constructor() { }

  ngOnInit(): void {
  }

  closeModal(): void{
    ModalBaseComponent.cleanModal();
  }

  static cleanModal(): void{
    ModalStatus.showModal = false;
    ModalStatus.modalType = '';
    ModalStatus.modalDataSimple = Modal.getEmptyModal();
  }

  static openModal(modal: Modal): void{
    ModalStatus.showModal = true;
    if(modal instanceof Modal){
      ModalStatus.modalDataSimple = modal;
      ModalStatus.modalType = ModalBaseComponent.modalTypes.simple;
    }
  }
}