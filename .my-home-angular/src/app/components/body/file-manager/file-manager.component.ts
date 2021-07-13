import { Component, OnInit } from '@angular/core';
import { FileManagerService } from 'src/app/services/file-manager/file-manager.service';
import { Path } from 'src/classes/Path';
import { AuthTools } from 'src/utils/variables/tools/auth.tools';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {

  directoryContent:Path[] = [];

  constructor(private authTools:AuthTools, private fileManagerService: FileManagerService) { }

  ngOnInit(): void {
    this.authTools.checkSession();
    this.getDirectory();
  }

  getDirectory(path?:string){
    this.fileManagerService.getDirectory(path).subscribe(
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
