import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { ApiService } from '../api.service';
import { Client, ClientBuilder } from '../models/usersubmitedform';
import { CitiesService } from '../services/cities.service';
import { MastersService } from '../services/masters.service';
import {SettingsService} from '../services/settings.service';
import { consts } from '../cosntants';
import {environment} from '../../environments/environment';


@Component({
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  cities = [];
  email = new FormControl('', [Validators.required, Validators.email]);
  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  city = new FormControl('', [Validators.required]);
  date = new FormControl('', [Validators.required]);
  time = new FormControl('', [Validators.required]);
  size = new FormControl('', [Validators.required]);
  today = new Date();
  minDate = new Date(this.today.setDate(this.today.getDate() + 1));
  isFormSubmitted = false;
  submittedForm: Client =  ClientBuilder.build();
  workHours = this.buildHoursAvailableForOrder();
  clockSize;

  getEmailErrorMessage() {
    return this.email.hasError('required') ? consts.valMsg.MustEnterEmail :
        this.email.hasError('email') ? consts.valMsg.NotValidEmail : '';
  }

  getNameErrorMessage() {
    return this.name.hasError('required') ? consts.valMsg.NameIsRequired :
        this.name.hasError('minlength') ? consts.valMsg.AtLeast3Chars : '';
  }

  getCityErrorMessage() {
    return this.city.hasError('required') ? consts.valMsg.MustChooseCity : '';
  }

  getDateErrorMessage() {
    return this.date.hasError('required') ? consts.valMsg.MustChooseDate : '';
  }

  getTimeErrorMessage() {
    return this.time.hasError('required') ? consts.valMsg.MustChooseTime : '';
  }

  getSizeErrorMessage() {
    return this.size.hasError('required') ? consts.valMsg.MustChooseSize : '';
  }


  makeOrder(master) {
    console.log('CONTROLLER master', master);
    const oderInfo = {
      masterID: master.ID,
      masterName: master.masterName,
      date: Date.parse(this.submittedForm.date.toString()),
      dateMsg: this.submittedForm.date,
      time: this.submittedForm.time,
      duration: this.submittedForm.duration.workHours,
      userName: this.submittedForm.userName,
      userEmail: this.submittedForm.userEmail,
      cityID: this.submittedForm.cityId,
      user: this.api.currentUser,
      price: this.submittedForm.duration.price
    };
    console.log('CONTROLLER oderInfo', oderInfo);

    this.api.createOrder(oderInfo);
    // Clear form and page to initial state
    this.isFormSubmitted = false;
    this.submittedForm = ClientBuilder.build();
    this.api.arr = [];
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.name = new FormControl('', [Validators.required, Validators.minLength(3)]);
    this.city = new FormControl('', [Validators.required]);
    this.date = new FormControl('', [Validators.required]);
    this.time = new FormControl('', [Validators.required]);
    this.size = new FormControl('', [Validators.required]);
  }


  constructor(
    public api: ApiService,
    public citiesService: CitiesService,
    public masterService: MastersService,
    public settings: SettingsService
  ) { }

  ngOnInit() {
   this.masterService.getMasters();
   this.citiesService.getCities()
     .subscribe(res => {
       this.cities = res;
     });
   this.settings.getItems()
     .subscribe(res => {
       this.clockSize = res;
     });
  }

  find() {
    const userData = {
      userName: this.submittedForm.userName,
      userEmail: this.submittedForm.userEmail
    };
    console.log('userData: ', userData );
    console.log('duration: ', this.submittedForm.duration );
    // Add new client to database
    this.api.addClient(userData);

    // forming query object for free masters search on backend
    const freeMastersQuery = {
      cityID: this.submittedForm.cityId,
      date: Date.parse(this.submittedForm.date.toString()),
      time: this.submittedForm.time,
      duration: this.submittedForm.duration.workHours
    };

    console.log('CONTROLLER freeMastersQuery: ', freeMastersQuery );
    this.api.getFreeMasters(freeMastersQuery);
    // this for changing layout when client
    this.isFormSubmitted = true;
  }

  backToStep1() {
    this.isFormSubmitted = false;
  }

  buildHoursAvailableForOrder() {
    const arr = [];
    const duration = environment.availableForOrderHours.finish - environment.availableForOrderHours.start;
    for (let i = 0; i <= duration; i++) {
      arr[ i ] = {'hour': ( i + environment.workingHours.start )};
    }
    return arr;
  }
}

