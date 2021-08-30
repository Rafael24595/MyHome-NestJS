import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-top-button',
  templateUrl: './scroll-top-button.component.html',
  styleUrls: ['./scroll-top-button.component.css']
})
export class ScrollTopButtonComponent implements OnInit {

  visibility = 'hidden';

  constructor() { }

  ngOnInit(): void {
    let body = document.getElementById('body');
    if(body){
      setInterval(()=>{
        if(body){
          const scrollValue = body.scrollHeight;
          const heightValue = body.getBoundingClientRect().height;
          const scrollPosition = body.scrollTop;

          if(scrollValue > heightValue && scrollPosition > heightValue / 2){
            this.visibility = 'visible';
          }
          else{
            this.visibility = 'hidden';
          }

          if(body.getAttribute('hasAux')){
            this.visibility = `${this.visibility} hasAux`
          }
        }
      },0);
    }
    
  }

  scrollTop(){
    let body = document.getElementById('body');
    if(body){
      this.softScrollAnimation(body);
    }
  }

  softScrollAnimation(element: HTMLElement, customSpeed?: number): void{
    let speed = (customSpeed) ? customSpeed : 5;
    const scrollWidth = element.scrollWidth;
    const interval = setInterval(()=>{
      const scrollPosition = element.scrollTop;
      if(scrollPosition > 0){
        element.scrollTo(scrollWidth, scrollPosition - speed);
        speed = speed + 5;
      }
      else{
        clearInterval(interval);
      }
    },0);
  }

}
