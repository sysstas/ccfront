import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';
import {environment} from '../../environments/environment';


@Component({
  templateUrl: './newOrder.component.html',
  styleUrls: ['./newOrder.component.css']
})


export class NewOrderComponent implements OnInit {
  orderInformation = this.api.newOrderInformation;

  constructor( public api: ApiService, public router: Router, ) { }

  public payPalConfig?: PayPalConfig;

  private initConfig(): void {
    this.payPalConfig = new PayPalConfig(PayPalIntegrationType.ClientSideREST, PayPalEnvironment.Sandbox, {
      commit: true,
      client: {
        sandbox: environment.sandbox
      },
      button: {
        label: 'paypal',
      },
      onPaymentComplete: () => {
        console.log('OnPaymentComplete SUCCESS');
        this.router.navigate(['/']);
      },
      onCancel: () => {
        console.log('OnCancel');
      },
      onError: ( error ) => {
        console.log('OnError', error);
        console.log('asdfffffffffffffff', this.orderInformation.price, this.api.createdOrdetInformation.id, this.orderInformation.masterName, this.orderInformation.price, this.api.createdOrdetInformation.id)
      },
      transactions: [{
        amount: {
          currency: 'USD',
          total: this.orderInformation.price
        },
        description: `Order #${this.api.createdOrdetInformation.id}`,
        custom: `${this.api.createdOrdetInformation.id}`,
        item_list: {
          items: [{
            name: this.orderInformation.masterName,
            currency: 'USD',
            price: this.orderInformation.price,
            quantity: 1,
            description: `${this.api.createdOrdetInformation.id}`
          }]
        }
      }]
    });
  }

  ngOnInit(): void {
    this.initConfig();
  }

  returnToStartPage() {
    this.router.navigate(['/client']);
  }
}


