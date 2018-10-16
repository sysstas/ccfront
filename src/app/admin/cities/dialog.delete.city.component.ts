import { Component, Inject } from '@angular/core';
import { ApiService } from '../../api.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CitiesService } from '../../services/cities.service';

@Component({
  templateUrl: 'dialog-delete-city.html',
})
export class DialogDeleteCityComponent {
  constructor(
    public api: ApiService,
    public service: CitiesService,
    public dialogRef: MatDialogRef<DialogDeleteCityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    onCloseButtonClick(): void {
    this.dialogRef.close();
  }
}
