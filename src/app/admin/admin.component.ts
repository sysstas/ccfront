import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs/Observable'


@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  panelOpenState: boolean = false;
  ScheduleForm = {    
    date:'',
    city:''
  }

  public masters  

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.api.getMasters()    
    this.api.getCities()
    this.api.getClients()
  }

  newCity: string

  masterRating = [
    {mark: 1},
    {mark: 2},
    {mark: 3},
    {mark: 4},
    {mark: 5}
  ]


  newMaster = {
    city: '',
    name : '',
    rating: ''
  }

  addNewCity(){ 
    // calling addCity funcnion on API 
    this.api.addCity(this.newCity)
    // refreshing cities list on page
    this.api.getCities()
  }

  addNewMaster(){
    // calling addMaster funcnion on API 
    this.api.addMaster(this.newMaster)
    // refreshing masters list on page
    this.api.getMasters()
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
