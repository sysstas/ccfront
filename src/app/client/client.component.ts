import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatProgressSpinnerModule} from '@angular/material';

import { ApiService } from '../api.service';
import { UserSubmitedForm } from '../models/usersubmitedform'
import { CitiesService } from '../services/cities.service';

@Component({
  selector: 'client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  /// FORM VALIDATION PART
  email = new FormControl('', [Validators.required, Validators.email])
  name = new FormControl('', [Validators.required, Validators.minLength(3)])
  city = new FormControl('', [Validators.required])
  date = new FormControl('', [Validators.required])
  time = new FormControl('', [Validators.required])
  size = new FormControl('', [Validators.required])

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter email' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  getNameErrorMessage() {
    return this.name.hasError('required') ? 'Name is required' :
        this.name.hasError('minlength') ? 'Should be at least 3 characters' :
            '';
  }

  getCityErrorMessage() {
    return this.city.hasError('required') ? 'You must choose city' : '';
  }

  getDateErrorMessage() {
    return this.date.hasError('required') ? 'You must choose date' : '';
  }

  getTimeErrorMessage() {
    return this.time.hasError('required') ? 'You must choose time' : '';
  }  

  getSizeErrorMessage() {
    return this.size.hasError('required') ? 'You must choose size' : '';
  } 
  /// Data Picker validation 
  today = new Date()
  minDate = new Date(this.today.setDate(this.today.getDate()+1))
  

  //////////////////////////////////////////////
  
  //// LOGIC PART
  isFormSubmitted = false

  submitedForm = new UserSubmitedForm('','', '','','','','')
  
  workHours = [
    {hour: 8},
    {hour: 9},
    {hour: 10},
    {hour: 11},
    {hour: 12},
    {hour: 13},
    {hour: 14},
    {hour: 15},
    {hour: 16},
    {hour: 17}    
  ]

  clockSize =[
    {
      size: "big",
      workTime: 3
    },
    {
      size: "medium",
      workTime: 2
    },
    {
      size: "small",
      workTime: 1
    }
  ]

  makeOrder(master) {
    console.log('CONTROLLER master',master)
    let oderInfo = {
      masterID: master.ID,
      masterName: master.masterName,
      date: Date.parse(this.submitedForm.date.toString()),
      dateMsg: this.submitedForm.date,
      time: this.submitedForm.time,
      duration: this.submitedForm.duration,
      userName: this.submitedForm.userName,
      userEmail: this.submitedForm.userEmail,
      cityID: this.submitedForm.cityId,
      user: this.api.currentUser  
    }
    console.log('CONTROLLER oderInfo',oderInfo)
    
    this.api.createOrder(oderInfo)    
    // Clear form and page to initial state    
    this.isFormSubmitted = false
    this.submitedForm = new UserSubmitedForm('','', '','','','','')
    this.api.arr = []
    this.email = new FormControl('', [Validators.required, Validators.email])
    this.name = new FormControl('', [Validators.required, Validators.minLength(3)])
    this.city = new FormControl('', [Validators.required])
    this.date = new FormControl('', [Validators.required])
    this.time = new FormControl('', [Validators.required])
    this.size = new FormControl('', [Validators.required])
  }
   

  constructor( 
    public api: ApiService,
    public citiesService: CitiesService 
  ) { }
    
  ngOnInit() {
   this.api.getMasters()
   this.citiesService.getCities()
  }

  find() {     
    let userData = {
      userName: this.submitedForm.userName,
      userEmail: this.submitedForm.userEmail
    }
    console.log('userData: ',userData )
    
    // Add new client to database
    this.api.addClient(userData)
     
    // forming query object for free masters search on backend
    let freeMasetersQuery = {
      cityID: this.submitedForm.cityId,
      date: Date.parse(this.submitedForm.date.toString()),
      time: this.submitedForm.time,
      duration: this.submitedForm.duration
    }    

    console.log('CONTROLLER freeMasetersQuery: ',freeMasetersQuery )
    this.api.getFreeMasters(freeMasetersQuery)    
    // this for changing layout when client 
    this.isFormSubmitted = true;
  }
  
  backToStep1(){
    this.isFormSubmitted = false;
  }    
 
}


