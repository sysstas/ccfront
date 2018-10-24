
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

(window as any).global = window;

@Injectable()
export class Auth0Service {

  auth0 = new auth0.WebAuth({
    // rememberLastLogin: false,
    // sso: false,
    clientID: '38arKe47zBt0ZGILpZBfgaMIBSsrpt8Y',
    domain: 'clockwiseclockwork.eu.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid',
    auto_login: false
    // state: 'none',
    // details: {
    //   prompts: ['login']
    // }
    // prompt: 'login'
  });

  constructor(
    public router: Router,
    private http: HttpClient
    ) {}



  public login(): void {
    this.auth0.authorize();
    // this.auth0.checkSession( );

  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        console.log(authResult)
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/']);
        console.log('navigation runs');
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

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // this.router.navigate(['https://clockwiseclockwork.eu.auth0.com/v2/logout']);
    document.location.href = 'https://clockwiseclockwork.eu.auth0.com/v2/logout?returnTo=http%3A%2F%2Flocalhost:4200';
    // this.http.get<any>(environment.logouturl)
    //   .subscribe(res => {
    //     console.log('xxxxxxxxxxxxxxx', res);
    //     this.router.navigate(['/']);
    //   }, error1 => console.log('yyyyyyyyyyyyyyyy', error1));
    // Go back to the home route
  }
}
