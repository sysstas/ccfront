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
              console.log('Date', thisDate);
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
        console.log('data', ({cityId: this.ScheduleForm.city.id, date: this.ScheduleForm.date }));
      });
  }

  scheduleConstruct(masters, orders) {
    // console.log('masters', masters)
    const sch = this.constructBlankSchedule(masters);
    // console.log('orders', orders)
    for (let i = 0; i < orders.length; i++) {
      const name = orders[i].master.masterName;
      const element = sch.filter((el) => {
        return el.masterName === name;
      });
      const duration = orders[i].duration;
      const start = orders[i].time;
      const id = orders[i].id;
      // console.log('bulk', element)
      this.constructSchelement(element, duration, start, id );
      // console.log(orders[i]);
    }
    return sch;
  }

  constructSchelement( element, duration, start, id) {
    for (let i = 0; i < duration; i++) {
      element[0].hours[start - 8 + i] = id;
      // console.log('element', element);
    }
  }

  constructBlankSchedule(arr) {
    const mastersArray = this.constructMastersNamesArray(arr);
    const blanSchkArray = [];
    for (let i = 0; i < mastersArray.length; i++ ) {
      mastersArray[i].hours = [null, null, null, null, null, null, null, null, null, null, null, null];
      blanSchkArray[i] = mastersArray[i];
    }
    // console.log('Blank Schedule Array', blanSchkArray);
    return blanSchkArray;
  }

  constructMastersNamesArray(arr): any {
    let mastersArray: any[];
    mastersArray = arr.map((obj) => {
      return {masterName: obj.masterName};
    });
    // console.log('mastersArray', mastersArray);
    return mastersArray;
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
}
