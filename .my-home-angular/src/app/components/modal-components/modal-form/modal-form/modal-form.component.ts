import { Component, OnInit } from '@angular/core';
import { ModalBaseComponent, ModalStatus } from '../../modal-base.component';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css']
})
export class ModalFormComponent implements OnInit {

  modal = ModalStatus;

  constructor() { }

  ngOnInit(): void {
  }

  closeModal(): void{
    ModalBaseComponent.cleanModal();
  }

  submitForm(): void{
    let formData: {[key: string]: string} = {};
    const inputs = this.modal.modalDataForm.inputs;
    const form = document.getElementById('modal-form-form');
    if(form){
      for (const input of inputs) {
        const name = input.name;console.log(document.getElementsByName(`modal-form-${name}`))
        const inputs = document.getElementsByName(`modal-form-${name}`) as NodeListOf<HTMLInputElement>;
        if(inputs[0]){
          const value = inputs[0].value;
          formData[name] = value;
        }
      }
    }
    this.modal.modalDataForm.funct(formData);
    if(this.modal.modalDataForm.closeEnd){
      this.closeModal();
    }
  }

}
