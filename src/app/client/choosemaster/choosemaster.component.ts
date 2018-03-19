import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'choosemaster',
  templateUrl: './choosemaster.component.html',
  styleUrls: ['./choosemaster.component.css']
})
export class ChoseMasterComponent implements OnInit {

  constructor( private api: ApiService) { }

  ngOnInit() {
  }

  
  allMasters = this.api.getMasters()


}
