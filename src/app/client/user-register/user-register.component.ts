import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  constructor( public api: ApiService, private _route: ActivatedRoute) { 
    // console.log("route parameters - id: ", this._route.snapshot.paramMap.get('id'))
  }
  
  ngOnInit() {
    let id = this._route.snapshot.paramMap.get('id')
    console.log(id)
    this.api.getInitialRegisterData({id:id})
    
  }
  
  userData = this.api.initialUserData
}
