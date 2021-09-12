import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Gallery } from 'src/classes/Collections/Gallery';
import { PlayListMusic } from 'src/classes/Collections/PlayListMusic';
import { PlayListVideo } from 'src/classes/Collections/PlayListVideo';
import { ErrorTools } from 'src/utils/tools/error.tools';
import { service_config, user_config } from 'src/utils/variables/Globals';
import { Location } from '@angular/common';
import { CandyRowSimpleComponent } from 'src/app/components/candy-row/candy-row-simple/candy-row-simple.component';
import { ActivatedRoute } from '@angular/router';
import { MiscTools } from 'src/utils/tools/misc.tools';
import { AuthTools } from 'src/utils/tools/auth.tools';

@Component({
  selector: 'app-collection-list-image',
  templateUrl: './collection-list-image.component.html',
  styleUrls: ['./collection-list-image.component.css']
})
export class CollectionListImageComponent implements OnInit {

  @Input() collection: Gallery | PlayListMusic | PlayListVideo | undefined;
  @Output() LoadNextCollectionPage = new EventEmitter<{}>();

  connection = service_config.connection; 
  ErrorTools = ErrorTools;

  image = {
    position: 0,
    show: false
  }

  constructor(private location: Location, private route: ActivatedRoute, private authTools: AuthTools) { }

  ngOnInit(): void {
    this.authTools.checkSession();
    this.hideImage();
  }

  ngOnDestroy(){
    MiscTools.resetLastElementCollection();
  }

  loadNextCollectionPage():void{
    this.LoadNextCollectionPage.next();
  }

  showImage(position: number): void{
    if(this.collection){
      this.image.position = position;
      this.image.show = true;
      this.updateURI(true);
      MiscTools.setLastElementCollection(this.collection.list[position].path);
    }
  }

  hideImage(): void{
    this.image.position = 0;
    this.image.show = false;
    this.updateURI();
    setTimeout(() => {
      MiscTools.scrollToElement(`${user_config.lastElementIdCollection.path}`);
      MiscTools.resetLastElementCollection();
    }, 1);
  }

  updateURI(showMedia?: boolean): void{
    if(this.collection){
      const owner = this.collection.owner;
      const name = this.collection.name;
      const media = (showMedia) ? `/${this.collection.list[this.image.position].name}` : '';
      this.location.replaceState(`/Collection/${owner}/image/${name}${media}`);
      CandyRowSimpleComponent.setCandyRowByUri(this.route);
    }
  }

}
