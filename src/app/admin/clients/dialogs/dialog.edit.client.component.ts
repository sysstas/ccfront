import { Component, Inject } from '@angular/core';
import { ApiService } from '../../../api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { ClientsService } from '../../../services/clients.service';
import {consts} from '../../../cosntants';

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

  edit() {
    this.service.editClient(this.data)
      .subscribe(() => {
        this.dialogRef.close(this.data);
      });
  }

  onCloseButtonClick(): void {
    this.dialogRef.close();
  }

  getUserNameErrorMessage() {
    return this.userName.hasError('required') ? consts.valMsg.NameIsRequired :
              '';
  }

  getUserEmailErrorMessage() {
    return this.userEmail.hasError('required') ? consts.valMsg.MustEnterEmail :
    this.userEmail.hasError('email') ? consts.valMsg.NotValidEmail :
    '';
  }
}
