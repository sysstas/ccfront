
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
// import {HttpClient} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import {environment} from '../../environments/environment';
const helper = new JwtHelperService();
// const helper = new JwtHelperService();

(window as any).global = window;

@Injectable()
export class Auth0Service {

  auth0 = new auth0.WebAuth({
    clientID: environment.auth0ClientId,
    domain: environment.auth0tenant,
    responseType: 'token id_token',
    redirectUri: `http://${environment.currentUrl}/callback`,
    scope: 'openid email profile'
  });

  constructor(
    public router: Router,
    // public helper: JwtHelperService
    // private http: HttpClient
    ) {}



  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        // console.log(authResult)
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/']);
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }


  public isAdmin(): boolean {
    const token = helper.decodeToken(localStorage.getItem('id_token'));
    const isAdmin = token['http://isAdmin/'];
    return !!isAdmin;
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    document.location.href = `${environment.logoutUrl}?returnTo=http%3A%2F%2F${environment.currentUrl}`;
  }
}
