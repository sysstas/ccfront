import { Injectable } from '@angular/core';
// import { ApiService } from './api.service';
import { Router, CanActivate } from '@angular/router';
// import {Auth0Service} from './auth/auth.service';
import {NGXLogger} from 'ngx-logger';
import {MatDialog} from '@angular/material';
import {ApiService} from '../api.service';
import {Auth0Service} from '../auth/auth.service';


@Injectable()
export class AuthGuardAdminService implements CanActivate {

  constructor(
    public api: ApiService,
    public router: Router,
    public  auth: Auth0Service,
    private logger: NGXLogger
  ) { }

  canActivate() {
    // if ( this.api.isLoggedIn() ) {
    if ( this.auth.isAuthenticated() && this.auth.isAdmin()) {
      this.logger.debug(`Access granted`);
      return true;
    }
    this.router.navigate(['/']);
    this.logger.debug(`Access denied`);
    return false;
  }
}
