import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

masters = this.api.getCities()


cities = this.api.getCities()

}
