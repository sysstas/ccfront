import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';


@Component({
  selector: 'newOrder',
  templateUrl: './newOrder.component.html',
  styleUrls: ['./newOrder.component.css']
})


export class NewOrderComponent {
    constructor( public api: ApiService) { }
    
orderInformation = this.api.newOrderInformation

}


