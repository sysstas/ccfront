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
    let busyMasters = this.filterMasters(this.submitedForm.city, this.submitedForm.date, this.submitedFormWithHours.busiHours)
    
    this.filteredMasters = this.mastersFilteredByCity.filter(val =>{
      return busyMasters.indexOf(val.id) == -1;
    })
  }

  makeOrder(userId) {
    console.log(this.submitedFormWithHours.busiHours)
    console.log(this.submitedForm.date.toString())
    console.log(userId)
  }


  constructor( private api: ApiService) { }

  ngOnInit() {
   this.api.getMasters()
  }


  cities = this.api.getCities()
  allMasters = this.api.getMasters()
  mastersFilteredByCity = []
  filteredMasters =[] 

   
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
  }

  ///
  // filter all masters to get all available masters
 
  filterMasters(city, dateH, timeH){
    this.mastersFilteredByCity = this.allMasters.filter(function (el){
      return el.city === city
    })   
   
    var maybeBusy = []
    var definetlyBusy = []

    this.mastersFilteredByCity.forEach(function(master){    
      if(master.busy.find(fidnDate)){
        let tmpMaster =  Object.assign({}, master)        
        maybeBusy.push(
          {id: master.id,
          date: tmpMaster.busy.find(fidnDate).date,
          time: tmpMaster.busy.find(fidnDate).time
          }
        )        
      }
    })   

    function fidnDate(StoredDate){
      return StoredDate.date == Date.parse(dateH.toString())
    }

    /// now ned to filter masters in busy hours array
    maybeBusy.forEach(function(master){
      if( compare(master.time, timeH) ){
        definetlyBusy.push(master.id)
      }
    })

    function compare(arr1, arr2){
      let busy = false
      for (let i = 0; i  < arr1.length; i ++) {
        const el1 = arr1[i];
        for (let k = 0; k < arr2.length; k++) {
          const el2 = arr2[k];
          if (el1 == el2) {
            busy = true
          }
        }        
      }
      return busy
    }
    return definetlyBusy
  }
}


