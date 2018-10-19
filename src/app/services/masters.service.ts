import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { ApiService } from '../api.service';
import { consts } from '../cosntants';

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
    this.http.post(`${this.api.addr}/masters`, newMaster)
    .subscribe(res => {
      if (res) {
        this.getMasters();
        this.api.openSnackBar(consts.msg.MasterSavedS);
      }
    });
  }

  editMaster(data) {
    this.http.put(`${this.api.addr}/masters/${data.id}`, data)
    .subscribe(res => {
      if (res) {
        this.getMasters();
        this.api.openSnackBar(consts.msg.MasterSavedS);
      }
    });
  }

  deleteMaster(data) {
    this.http.delete(`${this.api.addr}/masters/${data.id}`)
    .subscribe(() => {
      this.getMasters();
      this.api.openSnackBar(consts.msg.MasterDeletedS);
    });
  }


}
