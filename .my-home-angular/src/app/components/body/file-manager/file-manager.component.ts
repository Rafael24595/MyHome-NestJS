import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationError, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FileManagerService } from 'src/app/services/file-manager/file-manager.service';
import { Path } from 'src/classes/Path';
import { lastRequest, logos_name, media_types, service_config } from 'src/utils/variables/Globals';
import { AuthTools } from 'src/utils/tools/auth.tools';
import { MiscTools } from 'src/utils/tools/misc.tools';
import { ModalBaseComponent } from '../../modal-components/modal-base.component';
import { Modal } from 'src/classes/Modal';
import { ModalTools } from 'src/utils/tools/modal.tools';

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
          console.log(event.error);
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
    else{console.log()
      if(lastRequest.path == this.path){console.log('cache')
        this.directoryContent = lastRequest.content;
      }
      else{console.log('pettition')
        this.fileManagerService.getDirectory(this.path).subscribe(
          sucess=>{
            this.directoryContent = sucess.message;
            lastRequest.path = this.path;
            lastRequest.content = this.directoryContent;
          },
          err=>{
            console.error(err);
          }
        );
      }
      console.log(this.directoryContent)
    }
  }

  showElementOptions(element: Path){
    ModalTools.generateActions(this, element);
  }

  showProperties(path: Path): void{
    ModalTools.generateDescription(path);
  }

}
