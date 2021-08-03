import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Candy, CandyRow } from 'src/classes/CandyRow';
import { MiscTools } from 'src/utils/tools/misc.tools';

export let candyRow: CandyRow = CandyRow.getEmptyCandyRow();

@Component({
  selector: 'app-candy-row-simple',
  templateUrl: './candy-row-simple.component.html',
  styleUrls: ['./candy-row-simple.component.css']
})
export class CandyRowSimpleComponent implements OnInit {

  candyRow = candyRow;

  constructor() {}

  ngOnInit(): void {
  }

  static setCandyRow(candies: Candy[], separator?:string):void{
    candyRow.setNewCandyRow(candies, separator);console.log(candyRow)
  }

  static setCandyRowByUri(route: ActivatedRoute): void{
    const candiesArray = MiscTools.getPath(route).split('/');
    let candies: Candy[] = [];
    let uri = '';
    candiesArray.forEach(candy=>{
      if(candy != ""){
        uri = `${uri}/${candy}`;
        let name = `${candy.slice(0,1).toUpperCase()}${candy.slice(1)}`;
        candies.push({name: name, href: uri});
      }
    });
    this.setCandyRow(candies);
  }
}
