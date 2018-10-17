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
    return this.http.get<any>(this.api.addr + '/orders');
    // .subscribe(res => {
    //   if (res) {
    //     // console.log('API TEST', res)
    //     res.map( function(x) {
    //       x.city = x.city.cityName;
    //       x.master = x.master.masterName;
    //       x.userName = x.user.userName;
    //       x.userEmail = x.user.userEmail;
    //       return x;
    //     });
    //     // console.log('API TEST arr', arr)
    //     this.orders = res;
    //     console.log('API get orders: ', this.orders);
    //   }
    // });
  }

  deleteOrder(id): Observable<any> {
    return this.http.delete(this.api.addr + '/orders/' + id);
  }

}
