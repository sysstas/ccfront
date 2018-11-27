import {Component, Inject} from '@angular/core';
import {ApiService} from '../../../api.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {SettingsService} from '../../../services/settings.service';
import {FormControl, Validators} from '@angular/forms';
import {consts} from '../../../cosntants';

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
    return this.clockSize.hasError('required') ? consts.valMsg.SizeIsRequired :
      '';
  }

  getWorkHoursMessage() {
    return this.workHours.hasError('required') ? consts.valMsg.MustSpecifyHours :
      '';
  }

  getPriceMessage() {
    return this.price.hasError('required') ? consts.valMsg.PriseIsRequired :
      '';
  }

}
