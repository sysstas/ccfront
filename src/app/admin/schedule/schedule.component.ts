import { Component, OnInit } from '@angular/core';
import {CitiesService} from '../../services/cities.service';
import {ScheduleService} from '../../services/schedule.service';


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
    date: ((thedate) => {
              const thisDate = thedate.setHours(0,0,0,0);
              // console.log('Date', thisDate);
              const thisDate1 = new Date(thisDate);
              return thisDate1;
          })(new Date()),
  };
  displayedColumns = ['name', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'];

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
        // console.log('data', ({cityId: this.ScheduleForm.city.id, date: this.ScheduleForm.date }));
      });
  }

  find() {
    console.log('data123', ({cityId: this.ScheduleForm.city.id, date: this.ScheduleForm.date }))

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
      element.hours[start - 8 + i] = id;
      // console.log('element', element);
    }
  }

  constructBlankSchedule(arr): any {
    const mastersArray = [];
    for (let i = 0; i < arr.length; i++) {
      const name = arr[i].masterName;
      mastersArray[i] = { masterName: name, hours: [null, null, null, null, null, null, null, null, null, null, null, null]};
    }
    console.log('mastersArray', mastersArray);
    return mastersArray;
  }
}
