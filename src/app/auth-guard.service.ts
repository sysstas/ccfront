import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor( public api: ApiService, public router: Router ) { }

  canActivate(){
    if ( this.api.isLoggedIn() ) {
      return true;
    }
    this.router.navigate(['/'])
    return false
  }
}
