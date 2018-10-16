import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserAccountService } from '../../services/user-account.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
    // Form validation part
    email = new FormControl('', [Validators.required, Validators.email]);
    name = new FormControl('', [Validators.required]);
    password = new FormControl('', [Validators.required]);
    newpassword = new FormControl('', [Validators.required]);
    passwordconfirm = new FormControl('', [Validators.required]);
    userAccountData: any = {};
    // userOrders: any = {};
    isLoading = false;
  constructor( public service: UserAccountService) {}



  ngOnInit() {
    this.service.getUserAccountData().subscribe(res => {
      this.userAccountData = res;
      console.log('Component getUserAccountData data received ', this.userAccountData);
    });
    // this.service.getUserOrders().subscribe(res => {
    //   this.userOrders = res;
    //   console.log('Component userOrders data received', this.userOrders);
    // });
  }

  changePersonal() {
    this.isLoading = true;
    this.service.sendNewPersonal(this.userAccountData).subscribe(res => {
      this.isLoading = false;
      this.name.markAsUntouched();
      this.email.markAsUntouched();
      console.log('API.getUserOrders data received ', res);
    });
  }

  changePwd() {
    console.log('User-acc.c changePwd');
    this.service.changeCurrentPwd();
  }

  addPwd() {
    console.log('User-acc.c addPwd');
    this.service.sendNewPwd();
  }
}
