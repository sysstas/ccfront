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
    return this.http.get<any>(`${this.api.addr}/account`);
  }

  getUserOrders() {
    return this.http.get<any>(`${this.api.addr}/history`);
  }

  sendNewPersonal(data) {
    return this.http.put(`${this.api.addr}/account/change-personal/${data.id}`, data);
  }
}
