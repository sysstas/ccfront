import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit() {
  }



masters = this.api.getMasters()
cities = this.api.getCities()

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
  console.log(this.newCity)
  this.api.addCity(this.newCity)
}

addNewMaster(){
  this.api.addMaster(this.newMaster)
}

}
