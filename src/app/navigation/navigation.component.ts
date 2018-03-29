import { Component, OnInit } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material'
import { LoginSubmitedForm } from '../models/loginsubmitedform'
import { Router } from '@angular/router'
import { DialogLogin } from './dialog-login';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

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
}

