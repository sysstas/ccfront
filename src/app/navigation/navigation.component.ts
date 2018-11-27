import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import {Auth0Service} from '../auth/auth.service';


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
    // private socialAuthService: AuthService,
    public  auth0: Auth0Service
  ) {}


  logout(): void {
    this.api.IsLoggedIn = false;
    localStorage.clear();
    this.router.navigate(['/client']);

  }

}

