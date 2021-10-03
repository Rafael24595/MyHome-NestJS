import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CandyRowSimpleComponent } from 'src/app/components/candy-row/candy-row-simple/candy-row-simple.component';
import { Gallery } from 'src/classes/Collections/Gallery';
import { PlayListMusic } from 'src/classes/Collections/PlayListMusic';
import { PlayListVideo } from 'src/classes/Collections/PlayListVideo';
import { AuthTools } from 'src/utils/tools/auth.tools';
import { MiscTools } from 'src/utils/tools/misc.tools';
import { service_config } from 'src/utils/variables/Globals';
import { Location } from '@angular/common';
import { ErrorTools } from 'src/utils/tools/error.tools';

@Component({
  selector: 'app-collection-list-video',
  templateUrl: './collection-list-video.component.html',
  styleUrls: ['./collection-list-video.component.css']
})
export class CollectionListVideoComponent implements OnInit {

  @Input() collection: Gallery | PlayListMusic | PlayListVideo | undefined;
  @Output() LoadNextCollectionPage = new EventEmitter<{}>();

  video = {
    position: 0,
    show: false
  }

  connection = service_config.connection; 
  ErrorTools = ErrorTools;

  constructor(private location: Location, private route: ActivatedRoute, private authTools: AuthTools) { }

  ngOnInit(): void {console.log(this.collection)
    this.authTools.checkSession();
  }

  showVideo(position: number): void{
    if(this.collection){
      this.video.position = position;
      this.video.show = true;
      this.updateURI(true);
      MiscTools.setLastElementCollection(this.collection.list[position].path);
    }
  }

  updateURI(showMedia?: boolean): void{
    if(this.collection){
      const owner = this.collection.owner;
      const name = this.collection.name;
      const media = (showMedia) ? `/${this.collection.list[this.video.position].name}` : '';
      this.location.replaceState(`/Collection/${owner}/video/${name}${media}`);
      CandyRowSimpleComponent.setCandyRowByUri(this.route);
    }
  }

}
