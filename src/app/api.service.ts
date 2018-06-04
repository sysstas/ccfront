import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ApiService {
  
  loadingStatus = true;

  loadingSetTrue(){
    this.loadingStatus = true;
  }
  loadingSetFalse(){
    this.loadingStatus = false;
  }

  cities = []
  masters =[]
  clients = []
  orders = []
  masterRating = [
    {mark: 1},
    {mark: 2},
    {mark: 3},
    {mark: 4},
    {mark: 5}
  ]
//  addr = "https://apple-pie-41428.herokuapp.com"
  addr = "http://localhost:5000"
  constructor( private http: Http, 
    public router: Router,  
    public snackBar: MatSnackBar) { }


  //// City CRUD /////////////////////////////
  getCities(){
    this.http.get(this.addr+'/cities').subscribe( res => {
      this.cities = res.json() 
      //console.log(res) 
    })   
  }

  addCity(cityName: string){    
    let city = {cityName: cityName}
    this.http.post(this.addr+'/cities', city).subscribe(res => {
      if (res){
        this.getCities()
        this.openSnackBar('City succesfully saved')
        console.log(res)
      }
    })
  }

  editCity(data){   
    this.http.put(this.addr+'/cities/' + data.ID, data).subscribe(res => {      
      if (res){
        this.getCities()
        this.openSnackBar('City succesfully saved')
        console.log(res)
      }
    })
  }

  deleteCity(data){
    console.log(data)
    this.http.delete(this.addr+'/cities/' + data.ID).subscribe(res =>{
      if (res){
        this.getCities()
        this.openSnackBar('City succesfully deleted')  
        console.log(res) 
      }
    })
  }
  ////////////////////////////////////////////////////

  /////// CRUD Masters ///////////////////////////////
  getMasters(){
    this.http.get(this.addr+'/masters').subscribe( res => {
      this.masters = res.json() 
      console.log(res) 
    })     
  }

  addMaster(newMaster){    
    this.http.post(this.addr+'/masters', newMaster).subscribe( res => {
      if (res){
        this.getMasters()
        this.openSnackBar('Master succesfully saved')
        console.log(res)
      }
    })
  } 

  editMaster(data){
    console.log(data.id)
    this.http.put(this.addr+'/masters/' + data.id, data).subscribe( res => {
      if (res){
        this.getMasters()
        this.openSnackBar('Master succesfully saved')
        console.log(res)
      }
    })
  }

  deleteMaster(data){
    this.http.delete(this.addr+'/masters/' + data.id).subscribe(res =>{
      if (res){
        this.getMasters()
        this.openSnackBar('Master succesfully deleted')  
        console.log(res) 
      }
    })
  }
  //////////////////////////////////////

  /////// CRUD Clients ///////////////////////////////
  getClients(){
    this.http.get(this.addr+'/clients').subscribe( res => {
      this.clients = res.json() 
    })     
  }

  addClient(query){
    //console.log(query)
    this.http.post(this.addr+'/clients', query).subscribe(res =>{{
      if (res){
        this.getClients()
        this.openSnackBar('Client succesfully saved')
        console.log(res)        
      }
    }})
  }

  editClient(data){
    this.http.put(this.addr+'/clients/' + data.id, data).subscribe(res => {
      if (res){
        this.getClients()
        this.openSnackBar('Client succesfully saved')
        console.log(res)
      }
    })
  }

  deleteClient(data){
    this.http.delete(this.addr+'/clients/' + data.id).subscribe(res =>{
      if (res){
        this.getClients()
        this.openSnackBar('Client succesfully deleted')  
        console.log(res) 
      }
    })
  }
  //////////////////////////////////////

  /////// CRUD Orders //////////////////////
  getOrders(){
    return this.http.get(this.addr+'/order').subscribe(res =>{
      if (res){
        this.orders = res.json()
        console.log(this.orders)
      }
    })
  }

  getOrdersAfterChange(): Observable<any>{
    return this.http.get(this.addr+'/order')   
  }

  deleteOrder(id): Observable<any>{
    return this.http.delete(this.addr+'/order/' + id)
    // .subscribe(res =>{
    //   if (res){
    //     this.getOrders()
    //     //this.openSnackBar('Order succesfully deleted')  
    //     console.log(res)        
    //   }
    // })
  }

  createOrder(orderInfo): Observable<any>{    
    return this.http.post(this.addr+'/order', orderInfo)    
  }
  
  /////////////////////////////////////

  ////// App logic ///////////////////
  arr = []
  getFreeMasters(query){
     this.http.post(this.addr+'/freemasters', query).subscribe( res => {
       this.loadingSetTrue()
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

  updateMasterSchedule(orderInfo){    
    this.http.post(this.addr+'/order', orderInfo).subscribe(res => {
      if (res){
        console.log('master schedule updated')
        this.openSnackBar('You successfuly order a master')
        // refreshing masters array after adding new city
        this.getMasters()      
        this.getOrders()  
      }
    })    
  }


  IsLoggedIn = false
  Auth(login, password){
    let querry = {login: login, password: password}
    this.http.post(this.addr+'/login', querry).subscribe(res => {
      if (res){
        this.router.navigate(['/admin']) 
        this.IsLoggedIn = true
      }
    })    
  }
  isLoggedIn(){
    return this.IsLoggedIn;
  }

  openSnackBar(message) {
    this.snackBar.open( message, 'Close', {
      duration: 2000,
    });
  }

}




