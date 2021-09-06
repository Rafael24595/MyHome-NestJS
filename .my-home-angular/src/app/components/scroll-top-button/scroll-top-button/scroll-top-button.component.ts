import { Component, OnInit } from '@angular/core';
import { view_config } from 'src/utils/variables/Globals';

@Component({
  selector: 'app-scroll-top-button',
  templateUrl: './scroll-top-button.component.html',
  styleUrls: ['./scroll-top-button.component.css']
})
export class ScrollTopButtonComponent implements OnInit {

  view = view_config;

  constructor() { }

  ngOnInit(): void {
  }

  scrollTop(){
    let body = document.getElementById('body');
    if(body){
      this.softScrollAnimation(body);
    }
  }

  softScrollAnimation(element: HTMLElement): void{
    const loopSpeed = 50;
    const maxTime = (element.scrollTop > 5000) ? 1500 : 250;
    const initialValue = element.scrollTop/(maxTime/loopSpeed);
    const increment = initialValue * 0.05;
    let speed = initialValue;
    const scrollWidth = element.scrollWidth;
    const interval = setInterval(()=>{
      const scrollPosition = element.scrollTop;
      if(scrollPosition > 0){
        element.scrollTo(scrollWidth, scrollPosition - speed);
        speed = speed + increment;
      }
      else{
        clearInterval(interval);
      }
    },loopSpeed);
  }

}
