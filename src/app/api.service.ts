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
      console.log(x)
    })   
  }

  getMasters(){
    return this.http.get('http://localhost:3000/masters').map( x => x.json() )     
  }

  addCity(cityName: string){    
    let city = {cityName: cityName}
    this.http.post('http://localhost:3000/newcity', city).subscribe(res => {})
    // refreshing cities array after adding new city
    this.getCities()
  }

  // !!!temporary function, valid till moving all logic to node server an mongo
  addMaster(newMaster){
    let id = this.masters.length
    // using this construction to clone "newMaster" obj to "newobj"
    const newobj = { id: id, ...newMaster}    
    this.masters.push(newobj) 
  }  

}




