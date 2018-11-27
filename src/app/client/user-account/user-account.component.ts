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
  constructor( public service: UserAccountService) {}

  ngOnInit() {
    this.service.getUserAccountData().subscribe(res => {
      this.userAccountData = res;
    });
  }
}
