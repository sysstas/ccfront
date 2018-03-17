import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

masters =[
  {name: "Andrew"},
  {name: "Victor"},
  {name: "Orest"}
]

cities = [
  {city: "Dnipro"},
  {city: "Zhytomyr"}
]
}
