import { Component, Inject } from '@angular/core';
import { ApiService } from '../../api.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CitiesService } from '../../services/cities.service';

@Component({
  templateUrl: 'dialog-edit-city.html',
})
export class DialogEditCityComponent {
  constructor(
    public api: ApiService,
    public service: CitiesService,
    public dialogRef: MatDialogRef<DialogEditCityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  onCloseButtonClick(): void {
    this.dialogRef.close();
  }
  edit(data) {
    this.service.editCity(data);
  }
}
