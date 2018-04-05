import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ApiService {
  
  cities = []
  masters =[]
  clients = []
  masterRating = [
    {mark: 1},
    {mark: 2},
    {mark: 3},
    {mark: 4},
    {mark: 5}
  ]
  addr = "https://apple-pie-41428.herokuapp.com"
 // addr = "http://localhost:5000"
  constructor( private http: Http, 
    public router: Router,  
    public snackBar: MatSnackBar) { }

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
    this.http.post(this.addr+'/newcity', city).subscribe(res => {
      if (res){
        this.getCities()
        this.openSnackBarCity()
      }
    })
    // refreshing cities array after adding new city
    
  }
  
  addMaster(newMaster){    
    this.http.post(this.addr+'/newmaster', newMaster).subscribe(res => {
      if (res){
        this.getMasters()
        this.openSnackBarMaster()
      }
    })
    // refreshing masters array after adding new city
    
  }  

  updateMasterSchedule(orderInfo){    
    this.http.post(this.addr+'/updateschedule', orderInfo).subscribe(res => {})
    // refreshing masters array after adding new city
    this.getMasters()
  }

  sendClientData(query){
    //console.log(query)
    this.http.post(this.addr+'/sendclient', query).subscribe(res =>{{}})
  }
  
  delete(idValue, dbValue){    
    let query = {
      id: idValue,
      db: dbValue
    }    
    console.log(query)
    this.http.post(this.addr+'/delete', query).subscribe(res => {
      if (res) {
        if (dbValue === 'client') {
          this.getClients()
        } else if (dbValue === 'master') {
          this.getMasters()
          //console.log(idValue)
        } else if (dbValue === 'city') {
          this.getCities()
          //console.log(idValue)
        }
      }
    })
    
  }

  editClient(data){
    //console.log(data)
    this.http.post(this.addr+'/editclient', data).subscribe(res => {
      //console.log(res)
      if (res){
        this.getClients()
        this.openSnackBarClient()
      }
    })
  }

  editCity(data){
    //console.log(data)
    this.http.post(this.addr+'/editcity', data).subscribe(res => {
      //console.log(res)
      if (res){
        this.getCities()
        this.openSnackBarCity()
      }
    })
  }

  editMaster(data){
    //console.log(data)
    this.http.post(this.addr+'/editmaster', data).subscribe(res => {
      //console.log(res)
      if (res){
        this.getMasters()
        this.openSnackBarMaster()
      }
    })
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

  openSnackBarCity() {
    this.snackBar.open('City succesfully saved', 'Close', {
      duration: 2000,
    });
  }
  openSnackBarClient() {
    this.snackBar.open('Client succesfully saved', 'Close', {
      duration: 2000,
    });
  }
  openSnackBarMaster() {
    this.snackBar.open('Master succesfully saved', 'Close', {
      duration: 2000,
    });
  }
  
}




