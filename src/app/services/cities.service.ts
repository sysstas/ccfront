import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  constructor(
    public api: ApiService,
    private http: HttpClient,
  ) { }

  getCities() {
    return this.http.get<any>(`${this.api.addr}/cities`);
  }

  addCity(cityName: string) {
    const city = { cityName: cityName };
    return this.http.post(`${this.api.addr}/cities`, city);
  }

  editCity(data) {
    return this.http.put(`${this.api.addr}/cities/${data.ID}`, data);
  }

  deleteCity(data) {
    return this.http.delete(`${this.api.addr}/cities/${data.ID}`);
  }
}
