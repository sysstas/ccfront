import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    public api: ApiService,
    private http: HttpClient,
  ) { }

  getItems() {
    return this.http.get<any>(`${this.api.addr}/items`);
  }

  editItem(data) {
    return this.http.put(`${this.api.addr}/items/${data.id}`, data);
  }

  deleteItem(data) {
    return this.http.delete(`${this.api.addr}/items/${data.id}`);
  }
}
