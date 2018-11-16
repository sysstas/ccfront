import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs/Observable';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  orders = [];

  constructor(
    public api: ApiService,
    private http: HttpClient
  ) { }

  getOrders() {
    return this.http.get<any>(`${this.api.addr}/orders`);
  }

  deleteOrder(id): Observable<any> {
    return this.http.delete(`${this.api.addr}/orders/${id}`);
  }

  cancelOrder(id): Observable<any> {
    return this.http.post(`${this.api.addr}/orders/refund`, {id: id});
  }

}
