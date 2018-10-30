import { Component, Inject } from '@angular/core';
import { ApiService } from '../../../api.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CitiesService } from '../../../services/cities.service';
import {Observable} from 'rxjs';
import {consts} from '../../../cosntants';
import {NGXLogger} from 'ngx-logger';

@Component({
  templateUrl: 'dialog-delete-city.html',
})
export class DialogDeleteCityComponent {
  constructor(
    private logger: NGXLogger,
    public api: ApiService,
    public service: CitiesService,
    public dialogRef: MatDialogRef<DialogDeleteCityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    onCloseButtonClick(): void {
    this.dialogRef.close();
  }
  deleteCity(data) {
    this.service.deleteCity(data)
      .subscribe(() => {
            this.logger.debug('deleted');
            this.dialogRef.close(true);
      });
  }
}
