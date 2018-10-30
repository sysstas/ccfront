
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
// import {HttpClient} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import {environment} from '../../environments/environment';
import {StorageService} from '../services/storage.service';
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
    public storageService: StorageService
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
    this.storageService.SetItem('access_token', authResult.accessToken);
    this.storageService.SetItem('id_token', authResult.idToken);
    this.storageService.SetItem('expires_at', expiresAt);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(this.storageService.GetItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }


  public isAdmin(): boolean {
    const token = helper.decodeToken(this.storageService.GetItem('id_token'));
    const isAdmin = token['http://isAdmin/'];
    return !!isAdmin;
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    this.storageService.Clear();
    document.location.href = `${environment.logoutUrl}?returnTo=http%3A%2F%2F${environment.currentUrl}`;
  }
}
