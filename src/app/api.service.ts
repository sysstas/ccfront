import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserRegInfo } from './models/userRegInfo';
import { environment} from '../environments/environment';
import { consts } from './cosntants';

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

  addr = environment.backEndUrl;
  TOKEN_KEY = 'token';

  constructor( private http: HttpClient,
    public router: Router,
    public snackBar: MatSnackBar) { }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getInitialRegisterData(data) {
    // console.log('API.getInitialRegisterData runs, id - ', data.id);
    this.http.get<any>(`${this.addr}/register/${data.id}`).subscribe(res => {
      this.initialUserData = res;
      // console.log('API.getInitialRegisterData data received ', this.initialUserData);
    });
  }

  postRegisteredUserData() {
    // console.log('API.postRegisteredUserData runs ');
    const userData = {
      email: this.initialUserData.userEmail,
      password: this.initialUserData.password
    };

    this.http.post(`${this.addr}/register`, userData ).subscribe(res => {
      // console.log('API.postRegisteredUserData received ', res);
    });
    this.router.navigate(['/']);
  }

  getClients() {
    this.http.get<any>(`${this.addr}/users`).subscribe(res => {
      this.users = res;
    });
  }

  addClient(query) {
    this.http.post<any>(`${this.addr}/users`, query).subscribe(res => {{
      if (res) {
        // console.log('client creation server response ', res);
        this.currentUser = res;
        this.getClients();
        this.openSnackBar(consts.msg.UserSavedS);
      }
    }});
  }

  deleteClient(data) {
    // console.log('delete user data ', data);
    this.http.delete(`${this.addr}/users/${data.id}`).subscribe(res => {
      this.getClients();
      this.openSnackBar(consts.msg.UserSavedS);
    });
  }

  createOrder(newOrder) {
    // console.log('API send order', newOrder);
    this.http.post(`${this.addr}/orders`, newOrder).subscribe(res => {{
      if (res) {
        // console.log('order created ', res);
        // console.log('order created full ', newOrder);
        this.newOrderInformation = newOrder;
        this.createdOrdetInformation = res;
        this.router.navigate(['/neworder']);
      }
    }});
  }

  getFreeMasters(query) {
     this.http.post<any>(`${this.addr}/freemasters`, query).subscribe(res => {
       this.arr = res;
    });
  }

  Auth(login, password, googleToken): void {
    const querry = { login, password, googleToken};
    // console.log(querry);
    this.http.post<any>(`${this.addr}/login`, querry)
    .subscribe(res => {
      if (res) {
        // console.log('login: ', res);
        localStorage.setItem('token', res.token);
        this.decodedToken = helper.decodeToken(res.token);

        // console.log('decodedToken', this.decodedToken);
        if (this.decodedToken.isAdmin === 1) {
          this.router.navigate(['/admin']);
          this.IsLoggedIn = true;
          this.openSnackBar(consts.msg.LoggedAdmS);
        } else {
          this.IsLoggedIn = true;
          this.router.navigate(['/account']);
          this.openSnackBar(consts.msg.LoginS);
        }
      }
    }, () => {
      this.openSnackBar(consts.msg.AccessD);
    });
  }

  isLoggedIn() {
    return this.IsLoggedIn;
  }

  openSnackBar(message) {
    this.snackBar.open( message, 'Close', {
      duration: 2000,
    });
  }
}
