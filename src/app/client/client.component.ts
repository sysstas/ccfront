import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  isFormSubmitted = false

  submitedForm = {
    startHour:'',
    workTime: '',
    date:'',
    city:'',
    email:'',
    name:''
  }

  submitedFormWithHours = {
    busiHours: [],
    date:'',
    city:'',
    email:'',
    name:''
  }


  workHours = [
    {hour: 8},
    {hour: 9},
    {hour: 10},
    {hour: 11},
    {hour: 12},
    {hour: 13},
    {hour: 14},
    {hour: 15},
    {hour: 16},
    {hour: 17}    
  ]

  clockSize =[
    {
      size: "big",
      workTime: 3
    },
    {
      size: "medium",
      workTime: 2
    },
    {
      size: "small",
      workTime: 1
    }
  ]

  
  post() {     
    this.isFormSubmitted = true;
    this.workiHoursAnalizer(this.submitedForm.startHour, this.submitedForm.workTime)
    this.filterMasters(this.submitedForm.city, this.submitedForm.date, this.submitedFormWithHours.busiHours)
        
  }


  constructor( private api: ApiService) { }

  ngOnInit() {
  }


  cities = this.api.getCities()

  allMasters = this.api.getMasters()


 
  // forms array of busi hours for submitted form data
  workiHoursAnalizer(start:any, duration:any){
    let time = []
    time.push(start)
    if (duration === 3) {
      time.push(start+1)
      time.push(start+2) 
    } else if (duration === 2){
      time.push(start+1)      
    } 
    this.submitedFormWithHours.busiHours = time
    console.log("busi hours: "+this.submitedFormWithHours.busiHours)      
  }


  // filter all masters to get all available masters
  filteredMasters =[] 
  filterMasters(city, dateH, busiH){
    var filteredByCity = this.allMasters.filter(function (el){
      return el.city === city
    })
    
    // Now dividing all masters to two groups - one is "free all day", second is "may be busy in choosen day" - for further filtering
    var freeWholeDay = []
    var maybeBusy = []

    filteredByCity.forEach(function(master){
      let isFree = 0
      let mb = master.busy      
      for (let i = 0; i < mb.length; i++) {
        const element = mb[i];
        if(isFree == 0){
          if (element.date == Date.parse(dateH.toString())) {
            maybeBusy.push(master)
            isFree++          
          }
        }
      }
      if (isFree == 0) {
        freeWholeDay.push(master)
      } 
      isFree = 0 
    })
    console.log("date: " + Date.parse(dateH.toString()))
	  console.log("free: " + JSON.stringify(freeWholeDay))
    console.log("maybeBusi: " + JSON.stringify(maybeBusy))

    //console.log("Arr isTrue: " + isTrue)
    //console.log("DataH: " + Date.parse(dateH.toString()))

    // var newArray = homes.filter(function (el) {
    //   return el.price <= 1000 &&
    //          el.sqft >= 500 &&
    //          el.num_of_beds >=2 &&
    //          el.num_of_baths >= 2.5;
    // });
  }
}


