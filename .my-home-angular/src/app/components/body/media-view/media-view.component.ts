import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Path } from 'src/classes/Path';
import { logos_name, service_config } from 'src/utils/variables/Globals';
import { AuthTools } from 'src/utils/variables/tools/auth.tools';
import { MiscTools } from 'src/utils/variables/tools/misc.tools';

@Component({
  selector: 'app-media-view',
  templateUrl: './media-view.component.html',
  styleUrls: ['./media-view.component.css']
})
export class MediaViewComponent implements OnInit {

  path: string = '';
  parentDirectory: Path = Path.getEmptyPath();
  fileType: string = '';
  mediaPath = '../../../../assets/media/';
  connection = service_config.connection;
  logos_name = logos_name;

  constructor(private authTools:AuthTools, private miscTools:MiscTools, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.authTools.checkSession();
    this.path = this.miscTools.getChildPath(this.route);console.log(this.path)
    this.fileType = this.miscTools.typeFile(this.path);
    this.parentDirectory = Path.getParentDirectory(this.path);console.log(this.parentDirectory)
  }

}
