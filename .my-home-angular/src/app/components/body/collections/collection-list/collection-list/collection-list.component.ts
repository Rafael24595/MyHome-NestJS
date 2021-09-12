import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Gallery } from 'src/classes/Collections/Gallery';
import { PlayListMusic } from 'src/classes/Collections/PlayListMusic';
import { PlayListVideo } from 'src/classes/Collections/PlayListVideo';
import { Picture } from 'src/classes/File/Picture';
import { Theme } from 'src/classes/File/Theme';
import { AuthTools } from 'src/utils/tools/auth.tools';
import { MiscTools } from 'src/utils/tools/misc.tools';
import { user_config } from 'src/utils/variables/Globals';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.css']
})
export class CollectionListComponent implements OnInit {

  @Input() collection: Gallery | PlayListMusic | PlayListVideo | undefined;
  @Output() ToCollection = new EventEmitter<{list: Theme[] | Picture[], path: string}>();

  constructor(private authTools: AuthTools) { }

  ngOnInit(): void {
    this.authTools.checkSession();
    window.setTimeout(()=>{
      this.ngForEnd();
    }, 10)
  }

  ngOnDestroy(): void{
    MiscTools.resetLastElementCollection();
  }

  ngForEnd(): void{
    MiscTools.resetScroll(`body`);
    MiscTools.scrollToElement(`element-${user_config.lastElementIdCollection.path}`);
  }

  toCollection(element: Theme[] |Picture[],path:string):void{
    this.ToCollection.next({list:element, path:path});
  }

  toRandomCollection(): void{
    if(this.collection){
      const list = this.collection.list;
      const position = Math.floor(Math.random() * list?.length);
      const path = list[position].path;
      
      this.ToCollection.next({list, path});
    }
  }

}
