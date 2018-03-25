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
    name:'',
    busy:[]
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

  makeOrder(masterId) {
    let oderInfo = {
      id: masterId,
      date: Date.parse(this.submitedForm.date.toString()),
      time: this.submitedForm.busy
    }
    this.api.updateMasterSchedule(oderInfo)
  }
   

  constructor( private api: ApiService) { }
    
  ngOnInit() {
   this.api.getMasters()
   this.api.getCities()
  }

  find() {     
    // this for changing layout when client 
    this.isFormSubmitted = true;

    this.workiHoursAnalizer(this.submitedForm.startHour, this.submitedForm.workTime)
     
    // forming query object
    let query = {
      city: this.submitedForm.city,
      date: Date.parse(this.submitedForm.date.toString()),
      time: this.submitedForm.busy
    }    

    let clientQuery = {
      name: this.submitedForm.name,
      email: this.submitedForm.email
    }

    this.api.getFreeMasters(query)
    this.api.sendClientData(clientQuery)
    //let mastersFromCity = this.api.arr   
  }

    
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
    this.submitedForm.busy = time    
  }
}


