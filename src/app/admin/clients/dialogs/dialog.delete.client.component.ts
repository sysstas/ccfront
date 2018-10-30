import { Component, Inject } from '@angular/core';
import { ApiService } from '../../../api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ClientsService } from '../../../services/clients.service';
import {consts} from '../../../cosntants';

@Component({
  templateUrl: 'dialog-delete-client.html',
})
export class DialogDeleteClientComponent {
  constructor(
    public api: ApiService,
    public service: ClientsService,
    public dialogRef: MatDialogRef<DialogDeleteClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onCloseButtonClick(): void {
    this.dialogRef.close();
  }

  deleteClient() {
    this.service.deleteClient(this.data)
    .subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
