import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../../api.service';
import { Observable } from 'rxjs/Observable'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  ScheduleForm = {    
    date:'',
    city:''
  }

  constructor(
    public api: ApiService, 
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.api.getMasters()    
    this.api.getCities()
    this.api.getClients()
  }

  schelulefilter(){
    let city = this.ScheduleForm.city
    let date = Date.parse( this.ScheduleForm.date)
    let sheduleQuery = {      
      city: city,
      date: date
    }
    console.log(this.api.schedule)
    this.api.getMastersShedule(sheduleQuery)
  }

}