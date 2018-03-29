import { Component, OnInit } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material'
import { LoginSubmitedForm } from '../models/loginsubmitedform'
import { Router } from '@angular/router'

@Component({
    selector: 'dialog-login',
    templateUrl: 'dialog-login.html',
  })
  export class DialogLogin {
    
    submitedForm = new LoginSubmitedForm('','')
  
    constructor(
      public router: Router,
      public dialogRef: MatDialogRef<DialogLogin>) { }
  
    login(){
      console.log(this.submitedForm.email + ' ' + this.submitedForm.name)
      this.router.navigate(['/admin'])
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }