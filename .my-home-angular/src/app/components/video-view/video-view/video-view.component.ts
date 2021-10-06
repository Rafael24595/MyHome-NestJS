import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Gallery } from 'src/classes/Collections/Gallery';
import { PlayListMusic } from 'src/classes/Collections/PlayListMusic';
import { PlayListVideo } from 'src/classes/Collections/PlayListVideo';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css']
})
export class VideoViewComponent implements OnInit {

  @Input() collection: Gallery | PlayListMusic | PlayListVideo | undefined;
  @Input() video = {
    position: 0,
    show: false
  };
  @Output() HideImage = new EventEmitter<{}>();
  @Output() LoadNextCollectionPage = new EventEmitter<{}>();
  @Output() UpdateURI = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
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

}
