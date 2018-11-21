import { Component, OnInit } from '@angular/core';
import {CitiesService} from '../../services/cities.service';


@Component({
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  schedule = [];
  cities = [];
  ScheduleForm = {
    city: {},
    date: new Date()
  };
  displayedColumns = ['name', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'];

  constructor(
    public citiesService: CitiesService,
  ) { }

  ngOnInit() {
    this.citiesService.getCities()
      .subscribe(res => {
        this.cities = res;
        if (res[0]) {
          this.ScheduleForm.city = res[0];
        }
      });
    // this.api.getMasters()
    //  this.api.getCities()
    //  this.api.getOrders();
    // this.api.getClients()
  }


  schelulefilter() {
    const city = this.ScheduleForm.city;
    const date = Date.parse( this.ScheduleForm.date);
    const sheduleQuery = {
      cityID: city,
      date: date
    };
    // console.log('schedule', this.api.schedule);
    // this.api.getMastersShedule(sheduleQuery)
  }

}
