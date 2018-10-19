import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
})
export class UserRegisterComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  name = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  passwordconfirm = new FormControl('', [Validators.required]);

  constructor( public api: ApiService, private _route: ActivatedRoute) {
  }

  ngOnInit() {
    const id = this._route.snapshot.paramMap.get('id');
    this.api.getInitialRegisterData({id: id});
  }

  register() {
    this.api.postRegisteredUserData();
  }
}
