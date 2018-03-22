import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'
@Injectable()
export class ApiService {

 

  constructor( private http: Http ) { }

  getCities(){

    return this.cities
  }

  getMasters(){
    return  this.http.get('http://localhost:3000/masters')     
  }
 

  masters =[]
 
  addCity(cityName: string){
    this.cities.push(cityName) 
  }

  addMaster(newMaster){
    let id = this.masters.length
    // using thi construction to clone "newMaster" obj to "newobj"
    const newobj = { id: id, ...newMaster}    
    this.masters.push(newobj) 
  }

  cities = ["Dnipro", "Zhytomyr"]

  // masters = [
  //   { id: 1,
  //     name: "Andrew",
  //     city: "Dnipro",
  //     rating: 5,
  //     busy: [
  //       {
  //         date:1521496800000,
  //         time: [8,9,10]
  //       },
  //       {
  //         date:1521410400000,
  //         time: [8,9,10]
  //       },
  //     ]        
  //   },
  //   { id: 2,
  //     name: "Victor",
  //     city: "Dnipro",
  //     rating: 3,
  //     busy: [
  //       {
  //       date:1521410400000,
  //       time: [10,11,12]
  //       }
  //     ]        
  //   },         
  //   { id: 3,
  //     name: "Orest",
  //     city: "Zhytomyr",
  //     rating: 5,
  //     busy: [
  //       {
  //       date:1521410400000,
  //       time: [13,14,15]
  //       }
  //     ]        
  //   },
  //   { id: 4,
  //     name: "Lyashko",
  //     city: "Zhytomyr",
  //     rating: 2,
  //     busy: [
  //       {
  //       date:1521410400000,
  //       time: [8,9,10,16,17]
  //       }
  //     ]        
  //   }        
  // ]

}




