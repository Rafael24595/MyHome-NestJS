import { Component, OnInit } from '@angular/core';
import { AuthTools } from 'src/utils/variables/tools/auth.tools';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {

  constructor(private authTools:AuthTools) { }

  ngOnInit(): void {
    this.authTools.checkSession();
  }

}
