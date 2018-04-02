import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs/Observable'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
//import { DialogEdit } from './dialog-edit';


@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  panelOpenState: boolean = false;
  ScheduleForm = {    
    date:'',
    city:''
  }

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

  /// open dialog edit client
  openDialog(client): void {
    //console.log(client)
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { name: client.name, id: client._id, email: client.email }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  /// open dialog edit city
  openDialogEditCity(city): void {
    //console.log(client)
    let dialogRef = this.dialog.open(DialogEditCity, {
      width: '250px',
      data: { cityName: city.cityName, id: city._id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }


  /// open dialog edit master
  // openDialogEditMaster(master): void {
  //   //console.log(client)
  //   let dialogRef = this.dialog.open(DialogEditMaster, {
  //     width: '250px',
  //     data: { name: master.name, id: master._id, rating: master.rating, city: master.city}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     this.animal = result;
  //   });
  // }


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

  addNewCity(){ 
    // calling addCity funcnion on API 
    this.api.addCity(this.newCity)
    // refreshing cities list on page
    this.api.getCities()
  }

  // addNewMaster(){
  //   // calling addMaster funcnion on API 
  //   this.api.addMaster(this.newMaster)
  //   // refreshing masters list on page
  //   this.api.getMasters()
  // }

  schelulefilter(){
    let city = this.ScheduleForm.city
    let date = Date.parse( this.ScheduleForm.date)
    let sheduleQuery = {      
      city: city,
      date: date
    }
    console.log(this.api.schedule)
    this.api.getMastersShedule(sheduleQuery)
  }

}


/// dialog edit client
@Component({
  selector: 'dialog-edit',
  templateUrl: 'dialog-edit.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public api: ApiService,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  edit(){
    //console.log("edit is clicked")
   // console.log(data)
    this.api.editClient(this.data)
    
  }
}



/// dialog edit city
@Component({
  selector: 'dialog-edit',
  templateUrl: 'dialog-edit-city.html',
})
export class DialogEditCity {

  constructor(
    public api: ApiService,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  edit(data){
    //console.log("edit is clicked")
   // console.log(data)
    this.api.editCity(data)
    
  }
}


/// dialog edit master
// @Component({
//   selector: 'dialog-edit',
//   templateUrl: 'dialog-edit-master.html',
// })
// export class DialogEditMaster {

//   constructor(
//     public api: ApiService,
//     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: any) { }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

//   edit(data){
//     //console.log("edit is clicked")
//    // console.log(data)
//     this.api.editMaster(data)
    
//   }
// }