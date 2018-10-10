import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';

@Component({
  selector: 'newOrder',
  templateUrl: './newOrder.component.html',
  styleUrls: ['./newOrder.component.css']
})


export class NewOrderComponent implements OnInit {
  constructor( public api: ApiService, public router: Router,) { }
  
  public payPalConfig?: PayPalConfig;

  private initConfig(): void {
    this.payPalConfig = new PayPalConfig(PayPalIntegrationType.ClientSideREST, PayPalEnvironment.Sandbox, {
      commit: true,
      client: {
        sandbox: 'AYX-oFJ7-9A2WO4MsT2b2PNfgqvzk3ZHMoIN5HzmcIcBF7Y6dBpn3N1PosyElkwdel8lWi3fGTHEwz6v'
      },
      button: {
        label: 'paypal',
      },
      onPaymentComplete: (data, actions) => {
        console.log('OnPaymentComplete SUCCESS');
        this.router.navigate(['/'])
      },
      onCancel: (data, actions) => {
        console.log('OnCancel');
      },
      onError: (err) => {
        console.log('OnError');
      },
      transactions: [{
        amount: {
          currency: 'USD',
          total: 10.57
        },
        description: `Order #${this.api.createdOrdetInformation.id}`,
        custom: `${this.api.createdOrdetInformation.id}`,
        item_list: {
          items: [{    
            name: 'MASTER DN1',
            currency: 'USD',
            price: 10.57,
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

  // test(){
  //   console.log(this.api.createdOrdetInformation)
  // }
  orderInformation = this.api.newOrderInformation

  returnToStartPage() {
    this.router.navigate(['/client'])
  }
}


