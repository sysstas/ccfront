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

// masters = this.api.getCities()

// masters1 = this.api.getMasters()
cities = this.api.getCities()

newCity: string 

newMasterCity: string

masterRating = [
  {mark: 1},
  {mark: 2},
  {mark: 3},
  {mark: 4},
  {mark: 5}
]

//newMaster : {
 // id: number,
 // name: string
 // rating: number
//}
newMaster = {
  name : '',
  rating: ''
}

addNewCity(){
  console.log(this.newCity)
  this.api.addCity(this.newCity)
}

addNewMaster(){
  console.log(this.newMaster)
  console.log(this.newMasterCity)
  //this.api.addCity(this.newCity)
}

}
