import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../../api.service';
import { Observable } from 'rxjs/Observable'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'masters',
  templateUrl: './masters.component.html',
  styleUrls: ['./masters.component.css']
})
export class MastersComponent implements OnInit {
  panelOpenState: boolean = false;
  public masters  

  /// CREATE FORM VALIDATION PART
  newMasterName = new FormControl('', [Validators.required])
  newMasterRatingEdit = new FormControl('', [Validators.required])
  newMasterCity = new FormControl('', [Validators.required])

  getMasterNameErrorMessage() {
    return this.newMasterName.hasError('required') ? 'Name is required' :
              '';
  }

  getMasterRatingMessage() {
    return this.newMasterRatingEdit.hasError('required') ? 'Rating is required' :
              '';
  }

  getMasterCityMessage() {
  return this.newMasterCity.hasError('required') ? 'City is required' :
            '';
  }
  //////////////////////////////////////

  constructor(
    public api: ApiService, 
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.api.getMasters()     
    this.api.getCities()
    //this.api.getClients()
  }
  animal: string;
  name: string;

  /// open dialog delete master function
  openDialogDeleteMaster(master): void {    
    let dialogRef = this.dialog.open(DialogDeleteMaster, {
      width: '250px',
      data: { masterName: master.name, id: master._id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  } 

  /// open dialog edit master
  openDialogEditMaster(master): void {
    //console.log(client)
    let dialogRef = this.dialog.open(DialogEditMaster, {
      width: '250px',
      data: { name: master.name, id: master._id, rating: master.rating, city: master.city}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }


  newCity: string

  masterRating = [
    {mark: 1},
    {mark: 2},
    {mark: 3},
    {mark: 4},
    {mark: 5}
  ]


  newMaster = {
    city: '',
    name : '',
    rating: ''
  }

  addNewMaster(){
    // calling addMaster funcnion on API 
    this.api.addMaster(this.newMaster)
    // refreshing masters list on page
    this.api.getMasters()
  }
}

/// dialog delete master component
@Component({
  templateUrl: 'dialog-delete-master.html',
})
export class DialogDeleteMaster {
  constructor(
    public api: ApiService,
    public dialogRef: MatDialogRef<DialogDeleteMaster>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    onCloseButtonClick(): void {
    this.dialogRef.close();
  }
}

/// dialog edit master
@Component({
  selector: 'dialog-edit',
  templateUrl: 'dialog-edit-master.html',
})
export class DialogEditMaster {

  /// EDIT FORM VALIDATION PART
  masterName = new FormControl('', [Validators.required])
  masterRatingEdit = new FormControl('', [Validators.required])
  masterCity = new FormControl('', [Validators.required])

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
  //////////////////////////////////////

  constructor(
    public api: ApiService,
    public dialogRef: MatDialogRef<DialogEditMaster>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    onCloseButtonClick(): void {
    this.dialogRef.close();
  }

  edit(data){
    //console.log("edit is clicked")
   // console.log(data)
    this.api.editMaster(data)
    
  }
}