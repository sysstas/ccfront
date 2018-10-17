import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  userData = this.api.initialUserData;
  email = new FormControl('', [Validators.required, Validators.email]);
  name = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  passwordconfirm = new FormControl('', [Validators.required]);

  constructor( public api: ApiService, private _route: ActivatedRoute) {
    // console.log("route parameters - id: ", this._route.snapshot.paramMap.get('id'))
  }

  ngOnInit() {
    const id = this._route.snapshot.paramMap.get('id');
    // console.log(id);
    this.api.getInitialRegisterData({id: id});
  }

  register() {
    // console.log('USER_REGISTER', this.api.initialUserData);
    this.api.postRegisteredUserData();
  }
}
