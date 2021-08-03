import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationError, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CollectionsService } from 'src/app/services/collections/collections.service';
import { FileCollectionAbstract } from 'src/classes/Collections/FileColectionAbstract';
import { Gallery } from 'src/classes/Collections/Gallery';
import { PlayListMusic } from 'src/classes/Collections/PlayListMusic';
import { PlayListVideo } from 'src/classes/Collections/PlayListVideo';
import { Picture } from 'src/classes/File/Picture';
import { Theme } from 'src/classes/File/Theme';
import { AuthTools } from 'src/utils/tools/auth.tools';
import { CollectionTools } from 'src/utils/tools/collections.tools';
import { MiscTools } from 'src/utils/tools/misc.tools';
import { collection_owners, system_collections_group } from 'src/utils/variables/collection.constants';
import { ProgressBarListener } from '../../audio-bar/audio-bar/utils/services/listener.service';
import { CandyRowSimpleComponent } from '../../candy-row/candy-row-simple/candy-row-simple.component';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {

  routerEvent: Subscription | undefined;
  collections: Gallery[] | PlayListMusic[] | PlayListVideo[] | FileCollectionAbstract[] = [];
  mediaPath = '../../../../assets/media/';

  constructor(private authTools: AuthTools, private router: Router, private progressBarListener: ProgressBarListener, private route: ActivatedRoute, private collectionsService: CollectionsService) { }

  ngOnInit(): void {
    this.authTools.checkSession();
    this.routerEvent = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getCollections();
      }
      if (event instanceof NavigationError) {
        console.error(event.error);
      }
    });
    this.getCollections();
  }

  ngOnDestroy() {
    this.routerEvent?.unsubscribe();
  }

  async getCollections():Promise<void> {
    CandyRowSimpleComponent.setCandyRowByUri(this.route);
    const pathData = CollectionTools.getCollectionPathData(this.route);
    if (!pathData.owner) {
      this.collections = collection_owners;
    }
    else {
      switch (pathData.owner) {
        case 'system':
          if (!pathData.name) {
            this.collections = system_collections_group;
          }
          else {
            if(!pathData.list){
              this.getCollection(pathData.name, pathData.path);
            }
            else{
              if(this.collections.length < 1) await this.getCollection(pathData.name, pathData.path);
              const collection = CollectionTools.getCollectionByName(this.collections, pathData.list);
              if(collection) this.ToCollection(collection.list);
            }
          }
          break;
        case 'user': break;
      }
    }
  }

  async getCollection(name: string, path: string): Promise<boolean>{
    return new Promise((resolve)=>{
      this.collectionsService.getSystemCollection(name).subscribe(
        sucess => {console.log(sucess)
          const type = sucess.type;
          const object = sucess.message;
  
          switch (type){
  
            case 'audio':
              this.collections = PlayListMusic.interfaceToPlayListMusicArray(object, path);
            break;
            case 'image':
            
            break;
            case 'video':
            
            break;
            case undefined:
            
            break;
  
          }
          resolve(true);
        },
        err => {
          console.error(err);
          resolve(false);
        }
      );
      return false;
    });
  }

  ToCollection(collection: Theme[] |Picture[]) {

    if(collection[0] instanceof Theme){
      this.toMusicCollection(collection as Theme[]);
    };

  }

  toMusicCollection(themeList: Theme[]){
    if (themeList.length > 0) {
      this.router.navigate([`/Media${themeList[0].path}`]);
      setTimeout(() => {
        if (themeList) this.progressBarListener.sendThemeList(themeList);
      }, 1);
    }
  }

}
