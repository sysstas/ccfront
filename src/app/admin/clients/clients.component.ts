import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../../api.service';
import { Observable } from 'rxjs/Observable'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

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