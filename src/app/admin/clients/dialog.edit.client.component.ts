import { Component, Inject } from '@angular/core';
import { ApiService } from '../../api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-dialog-edit',
  templateUrl: 'dialog-edit-client.html',
})
export class DialogEditClientComponent {

  userName = new FormControl('', [Validators.required]);
  userEmail = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    public api: ApiService,
    public service: ClientsService,
    public dialogRef: MatDialogRef<DialogEditClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onCloseButtonClick(): void {
    this.dialogRef.close();
  }

  getUserNameErrorMessage() {
    return this.userName.hasError('required') ? 'You must enter user name' :
              '';
  }

  getUserEmailErrorMessage() {
    return this.userEmail.hasError('required') ? 'You must enter email' :
    this.userEmail.hasError('email') ? 'Not a valid email' :
    '';
  }

  edit() {
    this.service.editClient(this.data);
  }
}
