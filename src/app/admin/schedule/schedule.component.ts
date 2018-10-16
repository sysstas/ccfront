import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../../api.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  ScheduleForm = {
    date: '',
    city: ''
  };

  constructor(
    public api: ApiService,
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit() {
    // this.api.getMasters()
    //  this.api.getCities()
     this.api.getOrders();
    // this.api.getClients()
  }

  displayedColumns = ['name', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'];

  schelulefilter() {
    const city = this.ScheduleForm.city;
    const date = Date.parse( this.ScheduleForm.date);
    const sheduleQuery = {
      cityID: city,
      date: date
    };
    console.log('schedule', this.api.schedule);
    // this.api.getMastersShedule(sheduleQuery)
  }

}
