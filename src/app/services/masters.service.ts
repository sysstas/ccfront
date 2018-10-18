import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
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
    this.http.get<any>(this.api.addr + '/masters').subscribe( res => {
      this.masters = res;
      console.log('get masters:', res);
    });
  }

  addMaster(newMaster) {
    this.http.post(this.api.addr + '/masters', newMaster).subscribe( res => {
      if (res) {
        this.getMasters();
        this.api.openSnackBar('Master succesfully saved');
      }
    });
  }

  editMaster(data) {
    this.http.put(this.api.addr + '/masters/' + data.id, data).subscribe( res => {
      if (res) {
        console.log('API Master edit data: ', data);
        this.getMasters();
        this.api.openSnackBar('Master succesfully saved');
      }
    });
  }

  deleteMaster(data) {
    this.http.delete(this.api.addr + '/masters/' + data.id).subscribe(res => {
      this.getMasters();
      this.api.openSnackBar('Master succesfully deleted');
    });
  }


}
