import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Gallery } from 'src/classes/Collections/Gallery';
import { PlayListMusic } from 'src/classes/Collections/PlayListMusic';
import { PlayListVideo } from 'src/classes/Collections/PlayListVideo';
import { DragHorizontalPicture } from 'src/classes/DragHorizontalPicture';
import { AuthTools } from 'src/utils/tools/auth.tools';
import { ErrorTools } from 'src/utils/tools/error.tools';
import { service_config } from 'src/utils/variables/Globals';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.css']
})
export class ImageViewComponent implements OnInit {

  @Input() collection: Gallery | PlayListMusic | PlayListVideo | undefined;
  @Input() image = {
    position: 0,
    show: false
  };
  @Output() HideImage = new EventEmitter<{}>();
  @Output() LoadNextCollectionPage = new EventEmitter<{}>();
  @Output() UpdateURI = new EventEmitter<boolean>();
  
  connection = service_config.connection; 
  ErrorTools = ErrorTools;
  DragImageEvent = DragHorizontalPicture;

  constructor(private authTools: AuthTools) { }

  ngOnInit(): void {
    this.authTools.checkSession();
    this.setInitialImageValues();
  }

  loadNextCollectionPage(): void{
    this.LoadNextCollectionPage.next({});
  }

  hideImage():void{
    this.HideImage.next({});
  }

  updateURI(showMedia: boolean):void{
    this.UpdateURI.emit(showMedia);
  }

  dragImage(event: MouseEvent | TouchEvent):void{
    if(event instanceof TouchEvent){
      const parentElement = document.getElementById('img-view');
      const element =  document.getElementById('touch-panel');
      const touches = event.touches.length;
      
      if(this.collection && this.collection instanceof Gallery && element && parentElement){
        const instance = this.DragImageEvent.listener(touches, this.collection, this.image, element, parentElement, this.loadNextCollectionPage.bind(this), this.updateURI.bind(this), this.updateElementRotation.bind(this));
        if(instance){
          if(touches < 2){
            //event.preventDefault();
            instance.onKeepMouseDown();
          }
          else{
            /*event.returnValue = true;
            instance.onMouseUp();*/
          }
        }
      }
      console.log(event.touches.length)
    }
  }

  setInitialImageValues():void{
    setTimeout(() => {
      let image01 = document.getElementById('img-01') as HTMLImageElement;
      let image02 = document.getElementById('img-02') as HTMLImageElement;
      let image03 = document.getElementById('img-03') as HTMLImageElement;

      const apiUri = `${this.connection.protocol}://${this.connection.host}:${this.connection.port}/api/file/preview/`;

      if(this.collection && image01 && image02 && image03){

        const image01URI = (this.collection.list[this.image.position - 1]) ? this.collection.list[this.image.position - 1].path : '';
        const image02URI = (this.collection.list[this.image.position]) ? this.collection.list[this.image.position].path : '';
        const image03URI = (this.collection.list[this.image.position + 1]) ? this.collection.list[this.image.position + 1].path : '';

        image01.src = (image01URI != '') ? `${apiUri}${image01URI}` : '';
        image02.src = (image02URI != '') ? `${apiUri}${image02URI}` : '';
        image03.src = (image03URI != '') ? `${apiUri}${image03URI}` : '';

        image01.setAttribute('can-switch', (image01URI == '') ? 'false' : 'true');
        image03.setAttribute('can-switch', (image03URI == '') ? 'false' : 'true');

        this.updateElementRotation(image01URI, image01);
        this.updateElementRotation(image02URI, image02);
        this.updateElementRotation(image03URI, image03);
      }
    }, 10);
  }

  rotateImage(mode: boolean): void{

    let image = document.getElementById('img-02') as HTMLImageElement;

    if(image){

      let rotateValue = parseInt(image.getAttribute('rotation') as string);

      if(!rotateValue){
        image.setAttribute('rotation', '0')
        rotateValue = 0;
      }

      rotateValue = (mode) ? rotateValue + 90 : (rotateValue == 0) ? 360 - 90 : rotateValue - 90;

      const orientation = Math.abs(((Math.round(rotateValue / 90) / 4) % 1));

      let rotation = 360 * orientation;
      
      this.setRotation(image, rotation);
      this.updateRotationStorage(rotation);
    }

  }

  updateElementRotation(key: string, image: HTMLImageElement): void{
    const list = localStorage.getItem('rotation-storage');
    if(list){
      const rotation = parseInt(JSON.parse(list)[key]);
      this.setRotation(image, (rotation) ? rotation : 0);
    }
  }

  setRotation(image: HTMLImageElement, rotation: number):void{

    let container = document.getElementById('img-view') as HTMLImageElement;

    let maxHeight = '100%';
    let maxWidth = '100%';

    image.setAttribute('rotation', rotation.toString());
    image.style.transform = `rotate(${rotation}deg)`;

    if(rotation % 4){
      maxWidth = `${container.getBoundingClientRect().height}px`;
      maxHeight = `${container.getBoundingClientRect().width}px`;
    }
    
    image.style.maxWidth = maxWidth;
    image.style.maxHeight = maxHeight;
  }

  updateRotationStorage(rotation: number):void{
    let list = localStorage.getItem('rotation-storage');
    let object = (list) ? JSON.parse(list) : {};
    const key = this.collection?.list[this.image.position].path as string;
    
    object[key] = rotation;

    localStorage.setItem('rotation-storage', JSON.stringify(object));
  }

}
