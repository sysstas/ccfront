import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';


@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  cities = [];

  constructor(
    public api: ApiService,
    private http: HttpClient
  ) { }

  getCities() {
    this.http.get<any>(this.api.addr + '/cities').subscribe( res => {
      this.cities = res;
    });
  }

  addCity(cityName: string) {
    const city = {
      cityName: cityName
    };
    this.http.post(this.api.addr + '/cities', city).subscribe(res => {
      if (res) {
        this.getCities();
        this.api.openSnackBar('City succesfully saved');
      }
    });
  }

  editCity(data) {
    this.http.put(this.api.addr + '/cities/' + data.ID, data).subscribe(res => {
      if (res) {
        this.getCities();
        this.api.openSnackBar('City succesfully saved');
      }
    });
  }

  deleteCity(data) {
    this.http.delete(this.api.addr + '/cities/' + data.ID).subscribe(res => {
      this.getCities();
      this.api.openSnackBar('City succesfully deleted');
    });
  }
}
