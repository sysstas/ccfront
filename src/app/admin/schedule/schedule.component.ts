import { Component, OnInit } from '@angular/core';
import {CitiesService} from '../../services/cities.service';
import {ScheduleService} from '../../services/schedule.service';
import {environment} from '../../../environments/environment';


@Component({
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  schedule = [];
  cities = [];
  ScheduleForm = {
    city: {
      id: '',
      cityName: ''
    },
    date: this.buildCurrentDate(),
  };
  displayedColumns = this.buildDisplayedColumns();
  workingHours = environment.workingHours.finish - environment.workingHours.start;
  start = environment.workingHours.start;
  constructor(
    public citiesService: CitiesService,
    public service: ScheduleService
  ) { }

  ngOnInit() {
    this.citiesService.getCities()
      .subscribe(res => {
        this.cities = res;
        if (res[0]) {
          this.ScheduleForm.city = res[0];
        }
        this.find();
      });
  }

  find() {
    console.log('data123', ({cityId: this.ScheduleForm.city.id, date: this.ScheduleForm.date }));

    this.service.getSchedule({cityId: this.ScheduleForm.city.id, date: Date.parse(this.ScheduleForm.date.toString())})
      .subscribe( resp => {
        // console.log('resp', resp);
        const orders = resp.schedule;
        // console.log('orders1', orders);
        this.schedule = this.scheduleConstruct(resp.masters, orders);
        console.log('schedule123', this.schedule);
      });
  }

  scheduleConstruct(masters, orders) {
    const sched = this.constructBlankSchedule(masters);
    for (let i = 0; i < orders.length; i++) {
      const element = sched[i];
      const duration = orders[i].duration;
      const start = orders[i].time;
      const id = orders[i].id;
      this.constructElement(element, duration, start, id );
    }
    return sched;
  }

  constructElement( element, duration, start, id) {
    for (let i = 0; i < duration; i++) {
      element.hours[start - environment.workingHours.start + i] = id;
    }
  }

  constructBlankSchedule(arr): any {
    const mastersArray = [];
    for (let i = 0; i < arr.length; i++) {
      const name = arr[i].masterName;
      mastersArray[i] = { masterName: name, hours: this.emptyHoursArrayBuilder()};
    }
    console.log('mastersArray', mastersArray);
    return mastersArray;
  }

  emptyHoursArrayBuilder() {
    const arr = [];
    for (let i = 0; i <= environment.workingHours.finish - environment.workingHours.start; i++) {
      arr[i] = null;
    }
    return arr;
  }

  buildDisplayedColumns() {
    const arr = [];
    arr[0] = 'name';
    for (let i = 0; i <= environment.workingHours.finish - environment.workingHours.start; i++) {
      arr[ i + 1 ] = ( i + environment.workingHours.start ).toString();
    }
    return arr;
  }

  buildCurrentDate() {
    const thedate = new Date();
    const justDateNumber = thedate.setHours(0, 0, 0, 0);
    const justDate = new Date(justDateNumber);
    return justDate;
  }
}
