import {Component, Inject} from '@angular/core';
import {ApiService} from '../../../api.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {SettingsService} from '../../../services/settings.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  templateUrl: './dialog-edit-item.component.html'
})
export class DialogEditItemComponent {
  clockSize = new FormControl('', [Validators.required]);
  workHours = new FormControl('', [Validators.required]);
  price = new FormControl('', [Validators.required]);
   constructor(
    public api: ApiService,
    public service: SettingsService,
    public dialogRef: MatDialogRef<DialogEditItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onCloseButtonClick(): void {
    this.dialogRef.close();
  }

  edit() {
    this.service.editItem(this.data)
      .subscribe(() => {
        this.dialogRef.close(this.data);
      });
  }

  getClockSizeErrorMessage() {
    return this.clockSize.hasError('required') ? 'Name is required' :
      '';
  }

  getWorkHoursMessage() {
    return this.workHours.hasError('required') ? 'Rating is required' :
      '';
  }

  getPriceMessage() {
    return this.price.hasError('required') ? 'City is required' :
      '';
  }

}
