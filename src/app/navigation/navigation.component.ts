import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material'
import { Router } from '@angular/router'
import { DialogLogin } from './dialog-login';
import { ApiService } from '../api.service';
import {
  AuthService,  
  GoogleLoginProvider
} from 'angular-6-social-login';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  constructor(
    public dialog: MatDialog, 
    public api: ApiService, 
    public router: Router,
    private socialAuthService: AuthService
  ) {}

  socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        this.api.Auth( null, null, userData.idToken )
      }
    );
  }

  openDialog(): void {
    this.dialog.open(DialogLogin, {
      width: '250px'
    })
  }

  logout(): void {
    this.api.IsLoggedIn = false
    localStorage.clear()
    this.router.navigate(['/client'])
    
  }

  // onSignIn(googleUser) {
  //   console.log('XXXXXXXXXXXXXXXXXXXXTTTTTTTTTTRRRRRRRRRRRRRRRREEEEEEEEEEEEEEEEEEMMMMMMMMMMMMMMMMMMMMMMMMMMMMM'); // Do not send to your backend! Use an ID token instead.
  //   var profile = googleUser.getBasicProfile();
  //   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  //   console.log('Name: ' + profile.getName());
  //   console.log('Image URL: ' + profile.getImageUrl());
  //   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  // }
}

