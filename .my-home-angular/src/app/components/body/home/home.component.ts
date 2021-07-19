import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user_config } from 'src/utils/variables/Globals';
import { AuthTools } from 'src/utils/tools/auth.tools';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authTools:AuthTools) { }

  ngOnInit(): void {
    this.authTools.checkSession();
  }

  Globals_User = user_config;

}
