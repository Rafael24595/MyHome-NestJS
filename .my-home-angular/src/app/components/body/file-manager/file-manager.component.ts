import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationError, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FileManagerService } from 'src/app/services/file-manager/file-manager.service';
import { Path } from 'src/classes/Path';
import { group_types, logos_name, media_types, order_types, service_config, user_config } from 'src/utils/variables/Globals';
import { AuthTools } from 'src/utils/tools/auth.tools';
import { MiscTools } from 'src/utils/tools/misc.tools';
import { ModalTools } from 'src/utils/tools/modal.tools';
import { SortTools } from 'src/utils/tools/sort.tools';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {

  routerEvent: Subscription | undefined;
  path: string = '';
  directoryContent:Path[] = [];
  mediaPath = '../../../../assets/media/';
  groupByState = group_types.directories;
  orderByState = order_types.name;
  orderDirectionState = true;
  dirLoading = false;
  connection = service_config.connection; 
  media_types = media_types;
  logos_name = logos_name;

  constructor(private authTools:AuthTools, private router: Router, private route: ActivatedRoute, private fileManagerService: FileManagerService) { }

  ngOnInit(): void {
    this.authTools.checkSession();
    this.routerEvent = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getDirectory();
      }
      if (event instanceof NavigationError) {
          console.error(event.error);
      }
    });
    this.getDirectory();
  }

  ngOnDestroy() {
    this.routerEvent?.unsubscribe();
  }

  getDirectory(){
    this.path = MiscTools.getChildPath(this.route);
    if(MiscTools.isFile(this.path)){
      this.router.navigate([`/Media${this.path}`]);
    }
    else{
        this.showLoadMessage();
        this.fileManagerService.getDirectory(this.path).subscribe(
          sucess=>{
            this.directoryContent = sucess.message;
            this.orderBy(this.orderByState);
            MiscTools.resetLastElementMedia(this.path);
          },
          err=>{
            console.error(err);
          }
        );
    }
  }

  groupBy(mode: string){
    switch (mode){

      case group_types.directories:
        this.directoryContent = SortTools.Path.groupByDirectory(this.directoryContent, true);
      break;

      case group_types.files:
        this.directoryContent = SortTools.Path.groupByDirectory(this.directoryContent, false);
      break;

      case group_types.extension:
        this.directoryContent = SortTools.Path.groupByExtension(this.directoryContent);
      break;

      case group_types.type:
        this.directoryContent = SortTools.Path.groupByType(this.directoryContent);
      break;

    }

    this.groupByState = mode;

  }

  orderBy(mode: string, direction?: boolean){

    direction = (direction != undefined) ? direction : this.orderDirectionState;

    switch (mode){

      case order_types.name:
        this.directoryContent = SortTools.Path.orderByName(this.directoryContent, direction);
      break;

      case order_types.size:
        this.directoryContent = SortTools.Path.orderBySize(this.directoryContent, direction);
      break;

      case order_types.birth:
        this.directoryContent = SortTools.Path.orderByBirth(this.directoryContent, direction);
      break;

    }

    this.orderByState = mode;
    this.groupBy(this.groupByState);

  }

  orderDirection(mode: boolean){
    this.orderBy(this.orderByState, mode);
    this.orderDirectionState = mode;
  }

  showElementOptions(element: Path){
    ModalTools.generateActions(this, element);
  }

  showProperties(path: Path): void{
    ModalTools.generateDescription(path);
  }

  showLoadMessage(){
    this.directoryContent = [];
    this.dirLoading = true;
  }

  hideLoadMessage(){
    if(this.dirLoading){
      this.dirLoading = false;
      MiscTools.scrollToElement(`element-${user_config.lastElementIdMedia.path}`);
    }
  }

}
