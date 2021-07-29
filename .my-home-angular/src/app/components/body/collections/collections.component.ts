import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Theme } from 'src/classes/File/Theme';
import { AuthTools } from 'src/utils/tools/auth.tools';
import { ProgressBarListener } from '../../audio-bar/audio-bar/utils/services/listener.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {

  constructor(private authTools:AuthTools, private router: Router, private progressBarListener: ProgressBarListener) { }

  ngOnInit(): void {
    this.authTools.checkSession();
  }

  ToCollection(){

    let themeList = [
      new Theme('1', '/media/video/Anything goes by cole porter.mp3', '', {id: '', name: ''}, 0, 0, []),
      new Theme('2', '/media/video/Buona Sera (1998 Digital Remaster.mp3', '', {id: '', name: ''}, 0, 0, []),
      new Theme('3', '/media/video/movies/Albinoni.mp3', '', {id: '', name: ''}, 0, 0, [])
    ]

    this.router.navigate([`/Media${themeList[0].path}`]);

    setTimeout(() => {
      this.progressBarListener.sendThemeList(themeList);
    }, 1);
  
  }

}
