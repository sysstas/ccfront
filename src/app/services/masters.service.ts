import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class MastersService {
  masters = [];

  constructor(
    public api: ApiService,
    private http: HttpClient
  ) { }

  getMasters() {
    return this.http.get<any>(`${this.api.addr}/masters`);
  }

  addMaster(newMaster) {
    return this.http.post(`${this.api.addr}/masters`, newMaster);
  }

  editMaster(data) {
    return this.http.put(`${this.api.addr}/masters/${data.id}`, data);
  }

  deleteMaster(data) {
    return this.http.delete(`${this.api.addr}/masters/${data.id}`);
  }
}
