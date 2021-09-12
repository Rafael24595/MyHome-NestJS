import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MiscTools } from 'src/utils/tools/misc.tools';
import { ModalTools } from 'src/utils/tools/modal.tools';
import { FileManagerComponent } from '../file-manager.component';

@Component({
  selector: 'app-bottom-aux-menu',
  templateUrl: './bottom-aux-menu.component.html',
  styleUrls: ['./bottom-aux-menu.component.css']
})
export class BottomAuxMenuComponent implements OnInit {

  constructor(private fileManagerComponent: FileManagerComponent, private router: Router) { }

  ngOnInit(): void {
    let body = document.getElementById('body');
    body?.setAttribute('hasAux', 'true');
  }

  ngOnDestroy(): void{
    let body = document.getElementById('body');
    body?.removeAttribute('hasAux');
  }

  executeOption(mode: string){

    switch (mode){
      case "order":
        ModalTools.generateOrderBy(this.fileManagerComponent);
      break;

      case "group":
        ModalTools.generateGroupBy(this.fileManagerComponent);
      break;

      case "refresh":
        MiscTools.refreshPage(this.router);
      break;
    }

  }

}
