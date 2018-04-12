import { Component, OnInit } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material'
import { LoginSubmitedForm } from '../models/loginsubmitedform'
import { Router } from '@angular/router'
import { DialogLogin } from './dialog-login';
import { ApiService } from '../api.service';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(public dialog: MatDialog, 
              public api: ApiService,
              public router: Router) { }

  ngOnInit() {
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogLogin, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  logout(): void {
    this.api.IsLoggedIn = false
    this.router.navigate(['/client'])
  }
}

