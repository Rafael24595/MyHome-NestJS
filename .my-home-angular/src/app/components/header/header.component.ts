import { Component, OnInit } from '@angular/core';
import { user_config } from 'src/utils/variables/Globals';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user = user_config.user;

  constructor() { }

  ngOnInit(): void {
  }

}
