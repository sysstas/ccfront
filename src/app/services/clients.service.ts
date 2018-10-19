import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { consts } from '../cosntants';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  users = [];

  constructor(
    public api: ApiService,
    private http: HttpClient
  ) { }

  getClients() {
    this.http.get<any>(this.api.addr + '/users').subscribe( res => {
      // console.log('SERVICE client GET response ', res);
      this.users = res;
      // console.log('SERVICE ', this.users);
    });
  }

  addClient(query) {
    this.http.post<any>(this.api.addr + '/users', query).subscribe(res => {{
      if (res) {
        this.getClients();
        this.api.openSnackBar(consts.msg.ClientSavedS);
      }
    }});
  }

  editClient(data) {
    this.http.put(this.api.addr + '/users/' + data.id, data).subscribe(res => {
      if (res) {
        this.getClients();
        this.api.openSnackBar(consts.msg.ClientSavedS);
      }
    });
  }

  deleteClient(data) {
    // console.log('delete user data ', data);
    this.http.delete(this.api.addr + '/users/' + data.id).subscribe(res => {
      this.getClients();
      this.api.openSnackBar(consts.msg.ClientDeletedS);
    });
  }
}
