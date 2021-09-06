import { Component, OnInit } from '@angular/core';
import { OperationsTools } from '../../audio-bar/utils/tools/operations.tools';
import { ReproductionTools } from '../../audio-bar/utils/tools/reproduction.tools';
import { ViewTools } from '../../audio-bar/utils/tools/view.tools';

@Component({
  selector: 'app-audio-bar-lite',
  templateUrl: './audio-bar-lite.component.html',
  styleUrls: ['../../audio-bar/audio-bar.component.css']
})
export class AudioBarLiteComponent implements OnInit {

  View = ViewTools;
  Operations = OperationsTools;
  Reproduction = ReproductionTools;

  reverseSrc = '';

  constructor() { }

  ngOnInit(): void {
  }

}
