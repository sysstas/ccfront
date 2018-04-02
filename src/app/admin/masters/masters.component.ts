import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../../api.service';
import { Observable } from 'rxjs/Observable'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'masters',
  templateUrl: './masters.component.html',
  styleUrls: ['./masters.component.css']
})
export class MastersComponent implements OnInit {
  panelOpenState: boolean = false;
  public masters  

  constructor(
    public api: ApiService, 
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.api.getMasters()     
    this.api.getCities()
    this.api.getClients()
  }
  animal: string;
  name: string;

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

/// dialog edit master
@Component({
  selector: 'dialog-edit',
  templateUrl: 'dialog-edit-master.html',
})
export class DialogEditMaster {

  constructor(
    public api: ApiService,
    public dialogRef: MatDialogRef<DialogEditMaster>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  edit(data){
    //console.log("edit is clicked")
   // console.log(data)
    this.api.editMaster(data)
    
  }
}