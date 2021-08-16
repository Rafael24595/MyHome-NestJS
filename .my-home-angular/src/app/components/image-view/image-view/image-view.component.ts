import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Gallery } from 'src/classes/Collections/Gallery';
import { PlayListMusic } from 'src/classes/Collections/PlayListMusic';
import { PlayListVideo } from 'src/classes/Collections/PlayListVideo';
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

  connection = service_config.connection; 
  ErrorTools = ErrorTools;

  constructor() { }

  ngOnInit(): void {
  }

  hideImage():void{
    this.HideImage.next({});
  }

}
