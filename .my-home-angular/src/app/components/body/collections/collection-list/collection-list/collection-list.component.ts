import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Gallery } from 'src/classes/Collections/Gallery';
import { PlayListMusic } from 'src/classes/Collections/PlayListMusic';
import { PlayListVideo } from 'src/classes/Collections/PlayListVideo';
import { Picture } from 'src/classes/File/Picture';
import { Theme } from 'src/classes/File/Theme';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.css']
})
export class CollectionListComponent implements OnInit {

  @Input() collection: Gallery | PlayListMusic | PlayListVideo | undefined;
  @Output() ToCollection = new EventEmitter<{list: Theme[] | Picture[], path: string}>();

  constructor() { }

  ngOnInit(): void {
    console.log(this.collection)
  }

  toCollection(element: Theme[] |Picture[],path:string):void{
    this.ToCollection.next({list:element, path:path});
  }

  toRandomCollection(): void{
    if(this.collection){
      const list = this.collection.list;
      const position = Math.floor(Math.random() * list?.length);console.log(position)
      const path = list[position].path;
      
      this.ToCollection.next({list, path});
    }
  }

}
