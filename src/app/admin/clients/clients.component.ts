import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../../api.service';
import { Observable } from 'rxjs/Observable'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';

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
    //this.api.getMasters()     
   // this.api.getCities()
    this.api.getClients()
  }
  animal: string;
  name: string;

  /// open dialog delete client function
  openDialogDeleteClient(client): void {    
    let dialogRef = this.dialog.open(DialogDeleteClient, {
      width: '250px',
      data: { clientName: client.name, id: client._id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  } 

  /// open dialog edit client function
  openDialog(client): void {
    //console.log(client)
    let dialogRef = this.dialog.open(DialogEditClient, {
      width: '250px',
      data: { name: client.name, id: client._id, email: client.email }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}

/// dialog delete clinet component
@Component({
  templateUrl: 'dialog-delete-client.html',
})
export class DialogDeleteClient {
  constructor(
    public api: ApiService,
    public dialogRef: MatDialogRef<DialogDeleteClient>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

/// dialog edit client
@Component({
  selector: 'dialog-edit',
  templateUrl: 'dialog-edit-client.html',
})
export class DialogEditClient {

  /// EDIT FORM VALIDATION PART
  clientName = new FormControl('', [Validators.required])
  clientEmail = new FormControl('', [Validators.required, Validators.email])

  getClientNameErrorMessage() {
    return this.clientName.hasError('required') ? 'You must enter client name' :
              '';
  }

  getClientEmailErrorMessage() {
    return this.clientEmail.hasError('required') ? 'You must enter email' :
    this.clientEmail.hasError('email') ? 'Not a valid email' :
    '';
  }
  //////////////////////////////////////

  constructor(
    public api: ApiService,
    public dialogRef: MatDialogRef<DialogEditClient>,
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