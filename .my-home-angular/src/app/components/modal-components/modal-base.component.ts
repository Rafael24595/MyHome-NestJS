import { Component, OnInit } from '@angular/core';
import { Modal } from 'src/classes/Modal';
import { ModalForm } from 'src/classes/ModalForm';

export let ModalStatus: {showModal: boolean, modalType: string, options: boolean, modalDataSimple: Modal, modalDataForm: ModalForm} = {
  showModal: false,
  modalType: '',
  options: true,
  modalDataSimple: Modal.getEmptyModal(),
  modalDataForm: ModalForm.getEmptyModal()
}

@Component({
  selector: 'app-modal-base',
  templateUrl: './modal-base.component.html',
  styleUrls: ['./modal-base.component.css']
})
export class ModalBaseComponent implements OnInit {

  modal = ModalStatus;
  static modalTypes = {
    simple: 'simple',
    form: 'form'
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
    ModalStatus.modalDataForm = ModalForm.getEmptyModal();
  }

  static openModal(modal: Modal | ModalForm): void{
    ModalStatus.showModal = true;
    if(modal instanceof Modal){
      ModalStatus.modalDataSimple = modal;
      ModalStatus.modalType = ModalBaseComponent.modalTypes.simple;
    }
    if(modal instanceof ModalForm){
      ModalStatus.modalDataForm = modal;
      ModalStatus.modalType = ModalBaseComponent.modalTypes.form;
    }
  }
}