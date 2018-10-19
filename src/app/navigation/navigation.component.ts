import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DialogLogin } from './dialogs/dialog-login';
import { ApiService } from '../api.service';
import { AuthService, GoogleLoginProvider } from 'angular-6-social-login';

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

  socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform + ' sign in data : ' , userData);
        this.api.Auth( null, null, userData.idToken );
      }
    );
  }

  openDialog(): void {
    this.dialog.open(DialogLogin, {
      width: '250px'
    });
  }

  logout(): void {
    this.api.IsLoggedIn = false;
    localStorage.clear();
    this.router.navigate(['/client']);

  }

}

