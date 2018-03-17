import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  isFormSubmitted = false

  submitedForm = {}

  cities = [
    {city: "Dnipro"},
    {city: "Uzhgorod"}
  ]

  clockSize =[
    {
      size: "big",
      workTime: 3
    },
    {
      size: "medium",
      workTime: 2
    },
    {
      size: "small",
      workTime: 1
    }
  ]

  post() {     
    this.isFormSubmitted = true;
    console.log(this.submitedForm);     
  }
  constructor() { }

  ngOnInit() {
  }



}
