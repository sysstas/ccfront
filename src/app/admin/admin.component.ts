import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs/Observable'


@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public masters  

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getMasters().subscribe(x => this.masters = x)    
    this.api.getCities()
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
  //this.api.addMaster(this.newMaster)
  console.log(this.api.cities[0])
}

}
