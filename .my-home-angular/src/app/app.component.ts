import { Component } from '@angular/core';
import { user_config, view_config } from 'src/utils/variables/Globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  Globals_User = user_config;

  ngOnInit(){
    let body = document.getElementById('body');
    let firstAuxMenu = document.getElementById('first-aux-menu');
    if(body && firstAuxMenu){
      setInterval(()=>{
        if(body && firstAuxMenu){
          this.checkBodyScrollHeight(body);
          this.checkAuxMenuLength(body, firstAuxMenu);
        }
      },0);
    }
  }

  checkBodyScrollHeight(body: HTMLElement):void{
    const scrollValue = body.scrollHeight;
    const heightValue = body.getBoundingClientRect().height;
    const scrollPosition = body.scrollTop;

    if(scrollValue > heightValue && scrollPosition > heightValue / 2){
      view_config.scrollButtonVisivility = 'visible';
    }
    else{
      view_config.scrollButtonVisivility = 'hidden';
    }
  }

  checkAuxMenuLength(body: HTMLElement, firstAuxMenu: HTMLElement): void{
    if(body.getAttribute('hasAux')){
      firstAuxMenu?.classList.add('has-second-aux');
    }
    else{
      firstAuxMenu?.classList.remove('has-second-aux');
    }
  }

}
