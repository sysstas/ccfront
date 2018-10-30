import { Component, OnInit } from '@angular/core';
import {Auth0Service} from '../auth/auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(private service: Auth0Service) { }

  ngOnInit() {
    this.service.handleAuthentication();
  }

}
