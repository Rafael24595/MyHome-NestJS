import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Gallery } from 'src/classes/Collections/Gallery';
import { PlayListMusic } from 'src/classes/Collections/PlayListMusic';
import { PlayListVideo } from 'src/classes/Collections/PlayListVideo';
import { Picture } from 'src/classes/File/Picture';
import { Theme } from 'src/classes/File/Theme';
import { ErrorTools } from 'src/utils/tools/error.tools';
import { service_config } from 'src/utils/variables/Globals';

@Component({
  selector: 'app-collection-list-image',
  templateUrl: './collection-list-image.component.html',
  styleUrls: ['./collection-list-image.component.css']
})
export class CollectionListImageComponent implements OnInit {

  @Input() collection: Gallery | PlayListMusic | PlayListVideo | undefined;
  @Output() ToCollection = new EventEmitter<{list: Theme[] | Picture[], path: string}>();

  connection = service_config.connection; 
  ErrorTools = ErrorTools;

  constructor() { }

  ngOnInit(): void {
  }

  toCollection(element: Theme[] |Picture[],path:string):void{
    this.ToCollection.next({list:element, path:path});
  }

}
