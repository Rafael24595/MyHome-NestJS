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
import { ProgressBarListener, ProgressBarRepSettings } from '../../audio-bar/audio-bar/utils/services/listener.service';
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
  collectionList: {fastAccess:boolean,showList:boolean,collection:Gallery | PlayListMusic | PlayListVideo | undefined | undefined, type: string} = {
    fastAccess: false,
    showList: false,
    collection: undefined,
    type: ''
  }
  

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
    this.collectionList.showList = false;
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
              this.getCollection(pathData.name, pathData.path);console.log(this.collections)
            }
            else{
              if(this.collections.length < 1) await this.getCollection(pathData.name, pathData.path);
              const collection = CollectionTools.getCollectionByName(this.collections, pathData.list);
              this.listCollection(collection);
            }
          }
          break;
        case 'user': break;
      }
    }
  }

  listCollection(collection: Gallery | PlayListMusic | PlayListVideo | undefined): void{
    switch(this.collectionList.type){
      case 'audio':
        if(!this.collectionList.fastAccess) {
          this.collectionList.showList = true;
          this.collectionList.collection = collection;
        }
        else if(collection){
          this.ToCollection({list:collection.list})
        }
      break;
      case 'video':
      case 'image':
        this.collectionList.showList = true;
        this.collectionList.collection = collection;
      break;
    }
  }

  async getCollection(name: string, path: string): Promise<boolean>{
    return new Promise((resolve)=>{
      this.collectionsService.getSystemCollection(name).subscribe(
        sucess => {console.log(sucess)
          const type = sucess.type;
          const object = sucess.message;
          this.collectionList.type = sucess.type;
  
          switch (type){
  
            case 'audio':
              this.collections = PlayListMusic.interfaceToPlayListMusicArray(object as PlayListMusic[], path);
              console.log(this.collections)
            break;
            case 'image':
              this.collections = Gallery.interfaceToGalleryArray(object as Gallery[], path);
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

  ToCollection(collection:{list: Theme[] |Picture[], path?: string, settings?:ProgressBarRepSettings}) {

    collection.path = (collection.path) ? collection.path : collection.list[0].path;

    if(collection.list[0] instanceof Theme){
      this.toMusicCollection(collection.list as Theme[], collection.path, collection.settings);
    };

  }

  toMusicCollection(themeList: Theme[], path: string, settings?:ProgressBarRepSettings){
    if (themeList.length > 0) {
      this.router.navigate([`/Media${path}`]);
      const data = {
        list: themeList,
        collection: MiscTools.getPath(this.route),
        settings: settings
      }
      setTimeout(() => {
        if (themeList) this.progressBarListener.sendThemeList(data);
      }, 1);
    }
  }

}
