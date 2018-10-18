import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { LoginSubmitedForm } from '../models/loginsubmitedform';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  templateUrl: 'dialog-login.html',
})
export class DialogLogin {
  submitedForm = new LoginSubmitedForm('', '');
  constructor(
      public api: ApiService,
      public router: Router,
      public dialogRef: MatDialogRef<DialogLogin>) { }

  login(): void {
    this.api.Auth(this.submitedForm.login, this.submitedForm.password, null);
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
