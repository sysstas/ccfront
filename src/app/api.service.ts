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
      /// making appropriate array of hours when master is busy
      this.schedule.forEach((master, index, array) => {
        master.hours = []
        let arr = master.busy[0].time
        let length = arr.length
        for (let index = 0; index < length; index++) {
          const element = arr[index];         
          let i = element - 8
          master.hours[i] = "Busy"         
        }
      })
    })
  }

  addCity(cityName: string){    
    let city = {cityName: cityName}
    this.http.post(this.addr+'/newcity', city).subscribe(res => {
      if (res){
        this.getCities()
        this.openSnackBarEditCity()
      }
    })
    // refreshing cities array after adding new city
    
  }
  
  addMaster(newMaster){    
    this.http.post(this.addr+'/newmaster', newMaster).subscribe(res => {
      if (res){
        this.getMasters()
        this.openSnackBarEditMaster()
      }
    })
    // refreshing masters array after adding new city
    
  }  

  updateMasterSchedule(orderInfo){    
    this.http.post(this.addr+'/updateschedule', orderInfo).subscribe(res => {
      if (res){
        console.log('master schedule updated')
        this.openSnackBarSuccessOrder()
        // refreshing masters array after adding new city
        this.getMasters()        
      }
    })    
  }

  sendClientData(query){
    //console.log(query)
    this.http.post(this.addr+'/sendclient', query).subscribe(res =>{{
      if (res){
        console.log('client added to database')        
      }
    }})
  }
  
  delete(idValue, dbValue){    
    let query = {
      id: idValue,
      db: dbValue
    }    
    this.http.post(this.addr+'/delete', query).subscribe(res => {
      if (res) {
        if (dbValue === 'client') {
          this.getClients()
          this.openSnackBarDeleteClient()
          console.log('client deleted')
        } else if (dbValue === 'master') {
          this.getMasters()
          this.openSnackBarDeleteMaster()         
          console.log('master deleted')

        } else if (dbValue === 'city') {
          this.getCities()
          this.openSnackBarDeleteCity()  
          console.log('city deleted')
       
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
        this.openSnackBarEditClient()
      }
    })
  }

  editCity(data){
    //console.log(data)
    this.http.post(this.addr+'/editcity', data).subscribe(res => {
      //console.log(res)
      if (res){
        this.getCities()
        this.openSnackBarEditCity()
      }
    })
  }

  editMaster(data){
    //console.log(data)
    this.http.post(this.addr+'/editmaster', data).subscribe(res => {
      //console.log(res)
      if (res){
        this.getMasters()
        this.openSnackBarEditMaster()
      }
    })
  }



  IsLoggedIn = false
  Auth(login, password){
    let querry = {login: login, password: password}
    //console.log(login)
    this.http.post(this.addr+'/login', querry).subscribe(res => {
      if (res){
        this.router.navigate(['/admin']) 
        this.IsLoggedIn = true
      }
    })    
  }

  openSnackBarEditCity() {
    this.snackBar.open('City succesfully saved', 'Close', {
      duration: 2000,
    });
  }
  openSnackBarEditClient() {
    this.snackBar.open('Client succesfully saved', 'Close', {
      duration: 2000,
    });
  }
  openSnackBarEditMaster() {
    this.snackBar.open('Master succesfully saved', 'Close', {
      duration: 2000,
    });
  }
  openSnackBarDeleteCity() {
    this.snackBar.open('City succesfully deleted', 'Close', {
      duration: 2000,
    });
  }
  openSnackBarDeleteClient() {
    this.snackBar.open('Client succesfully deleted', 'Close', {
      duration: 2000,
    });
  }
  openSnackBarDeleteMaster() {
    this.snackBar.open('Master succesfully deleted', 'Close', {
      duration: 2000,
    });
  }
  openSnackBarSuccessOrder() {
    this.snackBar.open('You successfuly order a master', 'Close', {
      duration: 2000,
    });
  }
}




