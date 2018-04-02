import { Component, OnInit, Inject } from '@angular/core'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { ClientInfo } from '../models/clientinfo'
import { ApiService } from '../api.service';

@Component({
    selector: 'dialog-edit',
    templateUrl: 'dialog-edit.html',
  })
  export class DialogEdit {
    
    submitedForm = new ClientInfo('','','')
  
    constructor(
        public api: ApiService,        
        public dialogRef: MatDialogRef<DialogEdit>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }
  
    edit(){
      //console.log(this.submitedForm.login + ' ' + this.submitedForm.password)
      //this.router.navigate(['/admin'])
      //let auth = this.api.Auth(this.submitedForm.login, this.submitedForm.password)
      //console.log(auth)
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }