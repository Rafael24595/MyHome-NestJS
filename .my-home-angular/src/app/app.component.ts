import { Component } from '@angular/core';
import { user_config } from 'src/utils/variables/Globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  Globals_User = user_config;
}
