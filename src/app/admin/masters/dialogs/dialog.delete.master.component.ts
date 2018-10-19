import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MastersService } from '../../../services/masters.service';

@Component({
  templateUrl: 'dialog-delete-master.html',
})
export class DialogDeleteMasterComponent {
  constructor(
    public service: MastersService,
    public dialogRef: MatDialogRef<DialogDeleteMasterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    onCloseButtonClick(): void {
    this.dialogRef.close();
  }
}



