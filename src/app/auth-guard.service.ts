import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router, CanActivate } from '@angular/router';
import {Auth0Service} from './auth/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    public api: ApiService,
    public router: Router,
    public  auth: Auth0Service
  ) { }

  canActivate() {
    // if ( this.api.isLoggedIn() ) {
    if ( this.auth.isAuthenticated() ) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
