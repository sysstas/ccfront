import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class ApiService {
  
  cities = []
  masters =[]
  clients = []
  addr = "https://gentle-ravine-23080.herokuapp.com"
  constructor( private http: Http, public router: Router ) { }

  getCities(){
    this.http.get(this.addr+'/cities').subscribe( x => {
      this.cities = x.json()  
    })   
  }

  getMasters(){
    this.http.get(this.addr+'/masters').subscribe( x => {
      this.masters = x.json() 
    })     
  }

  getClients(){
    this.http.get(this.addr+'/clients').subscribe( x => {
      this.clients = x.json() 
    })     
  }

  arr = []
  getFreeMasters(query){
     this.http.post(this.addr+'/freemasters', query).subscribe( res => {
       this.arr = res.json()     
    })    
  }

  schedule = []
  getMastersShedule(query){
    this.http.post(this.addr+'/schedule', query).subscribe( res => {
      this.schedule = res.json()
    })
  }

  addCity(cityName: string){    
    let city = {cityName: cityName}
    this.http.post(this.addr+'/newcity', city).subscribe(res => {})
    // refreshing cities array after adding new city
    this.getCities()
  }
  
  addMaster(newMaster){    
    this.http.post(this.addr+'/newmaster', newMaster).subscribe(res => {})
    // refreshing masters array after adding new city
    this.getMasters()
  }  

  updateMasterSchedule(orderInfo){    
    this.http.post(this.addr+'/updateschedule', orderInfo).subscribe(res => {})
    // refreshing masters array after adding new city
    this.getMasters()
  }

  sendClientData(query){
    console.log(query)
    this.http.post(this.addr+'/sendclient', query).subscribe(res =>{{}})
  }
  
  IsLoggedIn = false
  Auth(login, password){
    let patternLogin =  'admin@example.com'
    let patternPassword = 'passwordsecret'
    if ( login == patternLogin && password == patternPassword){
      this.router.navigate(['/admin']) 
      this.IsLoggedIn = true
      return true
    } else return false
  }
}




