import { Component, OnInit } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material'
import { LoginSubmitedForm } from '../models/loginsubmitedform'
import { Router } from '@angular/router'
import { ApiService } from '../api.service';

@Component({
    selector: 'dialog-login',
    templateUrl: 'dialog-login.html',
  })
  export class DialogLogin {
    
    submitedForm = new LoginSubmitedForm('','')
  
    constructor(
        public api: ApiService,
        public router: Router,
        public dialogRef: MatDialogRef<DialogLogin>) { }
  
    login(){
      console.log(this.submitedForm.login + ' ' + this.submitedForm.password)
      //this.router.navigate(['/admin'])
      let auth = this.api.Auth(this.submitedForm.login, this.submitedForm.password)
      console.log(auth)
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }