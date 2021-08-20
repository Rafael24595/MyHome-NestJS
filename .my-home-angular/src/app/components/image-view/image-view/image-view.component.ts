import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Gallery } from 'src/classes/Collections/Gallery';
import { PlayListMusic } from 'src/classes/Collections/PlayListMusic';
import { PlayListVideo } from 'src/classes/Collections/PlayListVideo';
import { DragHorizontalPicture } from 'src/classes/DragHorizontalPicture';
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
  

  connection = service_config.connection; 
  ErrorTools = ErrorTools;
  DragImageEvent = DragHorizontalPicture;

  constructor() { }

  ngOnInit(): void {
    this.setInitialImageValues();
  }

  loadNextCollectionPage(): void{
    this.LoadNextCollectionPage.next({});
  }

  hideImage():void{
    this.HideImage.next({});
  }

  dragImage(event: MouseEvent | TouchEvent):void{
    const parentElement = document.getElementById('img-view');
    const element =  document.getElementById('touch-panel');
    event.preventDefault();
    if(this.collection && this.collection instanceof Gallery && element && parentElement){
      const instance = this.DragImageEvent.listener(this.collection, this.image, element, parentElement, this.loadNextCollectionPage.bind(this));
      if(instance){
        instance.onKeepMouseDown();
      }
    }
  }

  setInitialImageValues():void{
    setTimeout(() => {
      let image01 = document.getElementById('img-01') as HTMLImageElement;
      let image02 = document.getElementById('img-02') as HTMLImageElement;
      let image03 = document.getElementById('img-03') as HTMLImageElement;

      const apiUri = `${this.connection.protocol}://${this.connection.host}:${this.connection.port}/api/file/preview/`;

      if(this.collection && image01 && image02 && image03){

        const image01Exists = (this.collection.list[this.image.position - 1]) ? `${apiUri}${this.collection.list[this.image.position - 1].path}` : '';
        const image03Exists = (this.collection.list[this.image.position + 1]) ? `${apiUri}${this.collection.list[this.image.position + 1].path}` : '';

        image01.src = image01Exists;
        image02.src = `${apiUri}${this.collection.list[this.image.position].path}`;
        image03.src = image03Exists;

        image01.setAttribute('can-switch', (image01Exists == '') ? 'false' : 'true');
        image03.setAttribute('can-switch', (image03Exists == '') ? 'false' : 'true');
      }
    }, 10);
  }

  checkImageSize(event: Event): void{
    let element = event.target as HTMLImageElement;console.log(element)
    if(element){
      const height = element.getBoundingClientRect().height;console.log(height)
      if(height <= 100){
        const src = element.src.replace('/api/file/preview/', '/api/file/data/');
        //element.src = src;
      }
    }
  }

}
