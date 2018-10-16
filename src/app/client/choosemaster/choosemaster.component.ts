import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { MastersService } from '../../services/masters.service';

@Component({
  selector: 'choosemaster',
  templateUrl: './choosemaster.component.html',
  styleUrls: ['./choosemaster.component.css']
})
export class ChoseMasterComponent implements OnInit {
  allMasters = this.masterService.getMasters();
  constructor(
    private api: ApiService,
    public masterService: MastersService
  ) { }

  ngOnInit() {
  }





}
