import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  isFormSubmitted = false

  submitedForm = {}

  workHours

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
  constructor( private api: ApiService) { }

  ngOnInit() {
  }

  cities = this.api.getCities()

}
