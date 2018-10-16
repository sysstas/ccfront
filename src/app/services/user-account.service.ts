import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {
 userOrders = [];
  constructor(
    public api: ApiService,
    private http: HttpClient
  ) {}

  getUserAccountData() {
    console.log('Service.getUserAccountData runs');
    return this.http.get<any>(this.api.addr + '/account');
  }

  getUserOrders() {
    console.log('Service.getUserOrders runs');
    return this.http.get<any>(this.api.addr + '/history');
  }

  sendNewPwd() {
    console.log('New pwd is sent');
  }

  changeCurrentPwd() {
    console.log('New pwd and old one are sent');
  }

  sendNewPersonal(data) {
    console.log('New personal is sent', data);
    console.log('New personal is sent ' + this.api.addr + '/account/change-personal/' + data.id);
    return this.http.put(this.api.addr + '/account/change-personal/' + data.id, data);
  }
}
