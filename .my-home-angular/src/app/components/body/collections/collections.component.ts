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
  collectionList: {fastAccess:boolean,showList:boolean,collection:Gallery | PlayListMusic | PlayListVideo | undefined | undefined, type: string, isBuilding: boolean} = {
    fastAccess: false,
    showList: false,
    collection: undefined,
    type: '',
    isBuilding: false
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
              this.getAllCollections(pathData.name, pathData.path);
            }
            else{
              if(this.collections.length < 1) await this.getAllCollections(pathData.name, pathData.path);
              const collectionData = CollectionTools.getCollectionByName(this.collections, pathData.list);
              if(collectionData && collectionData.location){
                const collection = await this.getSingleCollection(pathData.name, collectionData.location);
                this.listCollection(collection);
              }
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

  async getSingleCollection(type: string, path: string, position?: number): Promise<Gallery | PlayListMusic | undefined>{
    return new Promise((resolve)=>{
      switch (type){
        case 'audio':
          this.collectionsService.getSystemCollectionAll(type, path).subscribe(
            sucess => {
              resolve(this.resolveGetCollection(sucess,path,type));
            },
            err => {console.error(err); resolve(undefined);}
          );
        break;
        case 'image':
          this.collectionsService.getSystemCollectionPage(type, position ? position : 0, path).subscribe(
            sucess => {
              resolve(this.resolveGetCollection(sucess,path,type));
            },
            err => {console.error(err);resolve(undefined);}
          );
        break;
      }
      
      return false;
    });
  }

  resolveGetCollection(sucess:{status: boolean, message: Gallery | PlayListMusic}, path: string, type: string): Gallery | PlayListMusic | undefined{
    const object = sucess.message;
    return CollectionTools.collectionListInterfaceToList(object, path, type, this.loadNextCollectionPage.bind(this));

  }

  async getAllCollections(name: string, path: string): Promise<boolean>{
    return new Promise((resolve)=>{
      this.collectionsService.getSystemCollection(name).subscribe(
        sucess => {
          const type = sucess.type;
          const object = sucess.message;
          this.collectionList.type = sucess.type;
  
          switch (type){
  
            case 'audio':
              this.collections = PlayListMusic.interfaceToPlayListMusicArray(object as PlayListMusic[], path);
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

  async loadNextCollectionPage():Promise<void>{
    let panel = document.getElementById('body');

    if(panel){
      const scrollHeight = panel.scrollTop;
      const scrollMaxHeight = panel.scrollHeight - panel.clientHeight;
      const collection =  this.collectionList.collection;

      if(scrollHeight >= scrollMaxHeight * 0.8 && collection && collection.location){
          const position = collection.position;

          if(collection.total && position && position < collection.total && this.collectionList.isBuilding == false){
            this.collectionList.isBuilding = true
            const type = CollectionTools.getType(collection);
            const path = collection.location;
            const newItems = await this.getSingleCollection(type, path, position);
            
            if(newItems){
              const list = CollectionTools.collectionListInterfaceToList(newItems, path, type).list;
              this.collectionList.collection = CollectionTools.updateCollectionPage(collection, list, newItems.position);
              this.collectionList.isBuilding = false
            } 
          }
      }
    }
  }

}
