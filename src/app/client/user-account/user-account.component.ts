import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
    // Form validation part
    email = new FormControl('', [Validators.required, Validators.email])
    name = new FormControl('', [Validators.required])
    password = new FormControl('', [Validators.required])
    newpassword = new FormControl('', [Validators.required])
    passwordconfirm = new FormControl('', [Validators.required])

  constructor( public api: ApiService) { 
  }

  ngOnInit() {
    this.api.getUserAccountData()    
  }

}
