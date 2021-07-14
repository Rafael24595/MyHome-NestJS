import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FileManagerService } from 'src/app/services/file-manager/file-manager.service';
import { Path } from 'src/classes/Path';
import { AuthTools } from 'src/utils/variables/tools/auth.tools';
import { MiscTools } from 'src/utils/variables/tools/misc.tools';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {

  routerEvent: Subscription | undefined;
  path: string = '';
  directoryContent:Path[] = [];

  constructor(private authTools:AuthTools, private miscTools: MiscTools, private router: Router, private route: ActivatedRoute, private fileManagerService: FileManagerService) { }

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
    this.path = this.miscTools.getChildPath(this.route);
    if(this.miscTools.isFile(this.path)){
      this.router.navigate([`/Media${this.path}`]);
    }
    else{
      this.fileManagerService.getDirectory(this.path).subscribe(
        sucess=>{console.log(sucess)
          this.directoryContent = sucess.message;
          console.log(this.directoryContent)
        },
        err=>{
          console.error(err);
        }
      );
    }
  }

}
