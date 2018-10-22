import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(
    public api: ApiService,
    private http: HttpClient
  ) { }

  getClients() {
    return this.http.get<any>(`${this.api.addr}/users`);
  }

  addClient(query) {
    return this.http.post<any>(`${this.api.addr}/users`, query);
  }

  editClient(data) {
    return this.http.put(`${this.api.addr}/users/${data.id}`, data);
  }

  deleteClient(data) {
    return this.http.delete(`${this.api.addr}/users/${data.id}`);
  }
}
