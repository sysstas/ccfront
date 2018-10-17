import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserRegInfo } from './models/userRegInfo';

const helper = new JwtHelperService();

@Injectable()
export class ApiService {

  users = [];
  initialUserData = new UserRegInfo('', '', '', '', 0);
  currentUser = {};
  newOrderInformation;
  createdOrdetInformation;
  arr = [];
  schedule = [];
  decodedToken;
  IsLoggedIn = false;

//  addr = "https://blooming-ocean-36906.herokuapp.com"
  addr = 'https://b6d91318.ngrok.io';
  // addr = "http://localhost:5000"
  TOKEN_KEY = 'token';

  constructor( private http: HttpClient,
    public router: Router,
    public snackBar: MatSnackBar) { }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getInitialRegisterData(data) {
    console.log('API.getInitialRegisterData runs, id - ', data.id);
    this.http.get<any>(this.addr + '/register/' + data.id).subscribe(res => {
      this.initialUserData = res;
      console.log('API.getInitialRegisterData data received ', this.initialUserData);
    });
  }

  postRegisteredUserData() {
    console.log('API.postRegisteredUserData runs ');
    const userData = {
      email: this.initialUserData.userEmail,
      password: this.initialUserData.password
    };

    this.http.post(this.addr + '/register', userData ).subscribe(res => {
      console.log('API.postRegisteredUserData received ', res);
    });
    this.router.navigate(['/']);
  }

  getClients() {
    this.http.get<any>(this.addr + '/users').subscribe( res => {
      this.users = res;
    });
  }

  addClient(query) {
    this.http.post<any>(this.addr + '/users', query).subscribe(res => {{
      if (res) {
        console.log('client creation server response ', res);
        this.currentUser = res;
        this.getClients();
        this.openSnackBar('Client succesfully saved');
      }
    }});
  }

  editClient(data) {
    this.http.put(this.addr + '/users/' + data.id, data).subscribe(res => {
      if (res) {
        this.getClients();
        this.openSnackBar('Client succesfully saved');        // console.log(res)
      }
    });
  }

  deleteClient(data) {
    console.log('delete user data ', data);
    this.http.delete(this.addr + '/users/' + data.id).subscribe(res => {
      this.getClients();
      this.openSnackBar('Client succesfully deleted');
    });
  }

  createOrder(newOrder) {
    console.log('API send order', newOrder);
    this.http.post(this.addr + '/orders', newOrder).subscribe(res => {{
      if (res) {
        console.log('order created ', res);
        console.log('order created full ', newOrder);
        this.newOrderInformation = newOrder;
        this.createdOrdetInformation = res;
        this.router.navigate(['/neworder']);
      }
    }});
  }

  getFreeMasters(query) {
     this.http.post<any>(this.addr + '/freemasters', query).subscribe( res => {
       this.arr = res;
    });
  }

  Auth(login, password, googleToken): void {
    const querry = { login, password, googleToken};
    console.log(querry);
    this.http.post<any>(this.addr + '/login', querry)
    .subscribe(res => {
      if (res) {
        console.log('login: ', res);
        localStorage.setItem('token', res.token);
        this.decodedToken = helper.decodeToken(res.token);
        console.log('decodedToken', this.decodedToken);
        if (this.decodedToken.isAdmin === 1) {
          this.router.navigate(['/admin']);
          this.IsLoggedIn = true;
          this.openSnackBar('You successfuly loged in as Admin');
        } else {
          this.IsLoggedIn = true;
          this.router.navigate(['/account']);
          this.openSnackBar('Successful login');
        }
      }
    }, err => {
      this.openSnackBar('Access denied');
    });
  }

  isLoggedIn() {
    // console.log(this.IsLoggedIn)
    return this.IsLoggedIn;
  }

  openSnackBar(message) {
    this.snackBar.open( message, 'Close', {
      duration: 2000,
    });
  }



  ///// PAYPAL
  sendPaymentResult(orderId, paymentId): void {
    console.log('API SAYS: ', orderId, paymentId);
    const query = {orderId, paymentId};
    this.http.put(this.addr + '/orders/test', query).subscribe(res => {{
      if (res) {
        console.log('order created ', res);
        // console.log('order created full ', newOrder)
        // this.newOrderInformation = newOrder
        // this.createdOrdetInformation = res
        // this.router.navigate(['/neworder'])
      }
    }});
  }

}
