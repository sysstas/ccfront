import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  users = [];
  currentUser = {};

  constructor(
    public api: ApiService,
    private http: HttpClient
  ) { }

  getClients() {
    this.http.get<any>(this.api.addr + '/users').subscribe( res => {
      console.log('SERVICE client GET response ', res);
      this.users = res;
      console.log('SERVICE ', this.users);
    });
  }

  addClient(query) {
    this.http.post<any>(this.api.addr + '/users', query).subscribe(res => {{
      if (res) {
        this.getClients();
        // this.currentUser = res;
        this.api.openSnackBar('Client succesfully saved');
        // // this.users.push(res);
        // console.log('SERVICE client creation server response ', res);
      }
    }});
  }

  editClient(data) {
    this.http.put(this.api.addr + '/users/' + data.id, data).subscribe(res => {
      if (res) {
        this.getClients();
        this.api.openSnackBar('Client succesfully saved');
      }
    });
  }

  deleteClient(data) {
    console.log('delete user data ', data);
    this.http.delete(this.api.addr + '/users/' + data.id).subscribe(res => {
      this.getClients();
      this.api.openSnackBar('Client succesfully deleted');
    });
  }
}
