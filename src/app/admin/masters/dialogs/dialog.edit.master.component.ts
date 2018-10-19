import { Component, Inject } from '@angular/core';
import { ApiService } from '../../../api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { CitiesService } from '../../../services/cities.service';
import { MastersService } from '../../../services/masters.service';

/// dialog edit master
@Component({
  templateUrl: 'dialog-edit-master.html',
})
export class DialogEditMasterComponent {
  masterName = new FormControl('', [Validators.required]);
  masterRatingEdit = new FormControl('', [Validators.required]);
  masterCity = new FormControl('', [Validators.required]);
  masterRating = [
    {mark: 1},
    {mark: 2},
    {mark: 3},
    {mark: 4},
    {mark: 5}
  ];

  constructor(
    public api: ApiService,
    public citiesService: CitiesService,
    public service: MastersService,
    public dialogRef: MatDialogRef<DialogEditMasterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    onCloseButtonClick(): void {
    this.dialogRef.close();
  }

  getMasterNameErrorMessage() {
    return this.masterName.hasError('required') ? 'Name is required' :
              '';
  }

  getMasterRatingMessage() {
    return this.masterRatingEdit.hasError('required') ? 'Rating is required' :
              '';
  }

  getMasterCityMessage() {
  return this.masterCity.hasError('required') ? 'City is required' :
            '';
  }

  edit(data) {
    this.service.editMaster(data);
  }
}
