import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserAccountService } from '../../services/user-account.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
    email = new FormControl('', [Validators.required, Validators.email]);
    name = new FormControl('', [Validators.required]);
    password = new FormControl('', [Validators.required]);
    userAccountData: any = {};
    isLoading = false;
  constructor( public service: UserAccountService) {}

  ngOnInit() {
    this.service.getUserAccountData().subscribe(res => {
      this.userAccountData = res;
      // console.log('Component getUserAccountData data received ', this.userAccountData);
    });
  }

  changePersonal() {
    this.isLoading = true;
    this.service.sendNewPersonal(this.userAccountData).subscribe(res => {
      this.isLoading = false;
      this.name.markAsUntouched();
      this.email.markAsUntouched();
      // console.log('API.getUserOrders data received ', res);
    });
  }
}
