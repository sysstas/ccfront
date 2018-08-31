import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'newOrder',
  templateUrl: './newOrder.component.html',
  styleUrls: ['./newOrder.component.css']
})


export class NewOrderComponent {
  constructor( public api: ApiService, public router: Router,) { }
    
  orderInformation = this.api.newOrderInformation

  returnToStartPage() {
    this.router.navigate(['/client'])
  }
}


