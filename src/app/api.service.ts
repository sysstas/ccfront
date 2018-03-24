import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {
  
  cities = []
  masters =[]

  constructor( private http: Http ) { }

  getCities(){
    this.http.get('http://localhost:3000/cities').subscribe( x => {
      this.cities = x.json()  
    })   
  }

  getMasters(){
    this.http.get('http://localhost:3000/masters').subscribe( x => {
      this.masters = x.json() 
    })     
  }

  arr = []
  getFreeMasters(query){
    
    // let choosesCity = {city: city}
     this.http.post('http://localhost:3000/freemasters', query).subscribe( res => {
       this.arr = res.json() 
    //   console.log("api " + this.arr)      
    })    
  }

  addCity(cityName: string){    
    let city = {cityName: cityName}
    this.http.post('http://localhost:3000/newcity', city).subscribe(res => {})
    // refreshing cities array after adding new city
    this.getCities()
  }
  
  addMaster(newMaster){    
    this.http.post('http://localhost:3000/newmaster', newMaster).subscribe(res => {})
    // refreshing masters array after adding new city
    this.getMasters()
  }  

  updateMasterSchedule(orderInfo){    
    this.http.post('http://localhost:3000/updateschedule', orderInfo).subscribe(res => {})
    // refreshing masters array after adding new city
    this.getMasters()
  }
}




