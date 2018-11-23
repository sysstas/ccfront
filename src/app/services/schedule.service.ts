import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(
    public api: ApiService,
    private http: HttpClient,
  ) { }

  getSchedule(data) {
    return this.http.post<any>(`${this.api.addr}/schedule`, data);
  }
}
