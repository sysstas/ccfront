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
  /// CREATE FORM VALIDATION PART
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
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    //this.api.getMasters()     
   // this.api.getCities()
    this.api.getClients()
  }
  //animal: string;
  name: string;
  
  newClient = {
    clientName: '',
    clientEmail: ''
  }
  // Clean after submit
  clean(): void{
    console.log()
    this.newClient = {
      clientName: '',
      clientEmail: ''
    };
    this.clientName.reset();
    this.clientEmail.reset();
  }


  /// open dialog delete client function
  openDialogDeleteClient(client): void {    
    let dialogRef = this.dialog.open(DialogDeleteClient, {
      width: '250px',
      data: { clientName: client.clientName, id: client.ID}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  } 

  /// open dialog edit client function
  openDialog(client): void {
    console.log(client)
    let dialogRef = this.dialog.open(DialogEditClient, {
      width: '250px',
      data: { clientName: client.clientName, id: client.ID, clientEmail: client.clientEmail }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }
  
  addNewClient(){ 
    // calling addCity funcnion on API 
    console.log('send client data: ', this.newClient)
    this.api.addClient(this.newClient)
    // refreshing cities list on page
    this.api.getClients()
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
    onCloseButtonClick(): void {
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

    onCloseButtonClick(): void {
    this.dialogRef.close();
  }

  edit(){
    //console.log("edit is clicked")
   // console.log(data)
    this.api.editClient(this.data)
    
  }
}