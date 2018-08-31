import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../../api.service';
import { Observable } from 'rxjs/Observable'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'isAdmin'})
export class IsAdmin implements PipeTransform {
    transform(value) {
        return value ? 'Admin' : 'User';
    }
}
@Pipe({name: 'isReg'})
export class IsReg implements PipeTransform {
    transform(value) {
        return value ? 'Registered' : 'Not registered';
    }
}

@Component({
  selector: 'clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  /// CREATE FORM VALIDATION PART
  userName = new FormControl('', [Validators.required])
  userEmail = new FormControl('', [Validators.required, Validators.email])

  getUserNameErrorMessage() {
    return this.userName.hasError('required') ? 'You must enter user name' :
              '';
  }

  getUserEmailErrorMessage() {
    return this.userEmail.hasError('required') ? 'You must enter email' :
    this.userEmail.hasError('email') ? 'Not a valid email' :
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
  
  newUser = {
    userName: '',
    userEmail: ''
  }
  // Clean after submit
  clean(): void{
    console.log()
    this.newUser = {
      userName: '',
      userEmail: ''
    };
    this.userName.reset();
    this.userEmail.reset();
  }


  /// open dialog delete client function
  openDialogDeleteUser(user): void { 
    console.log('user', user)   
    let dialogRef = this.dialog.open(DialogDeleteClient, {
      width: '250px',
      data: { userName: user.userName, id: user.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  } 

  /// open dialog edit user function
  openDialog(user): void {
    console.log(user)
    let dialogRef = this.dialog.open(DialogEditClient, {
      width: '250px',
      data: { userName: user.userName, id: user.id, userEmail: user.userEmail }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }
  
  addNewUser(){ 
    // calling addCity funcnion on API 
    console.log('send client data: ', this.newUser)
    this.api.addClient(this.newUser)
    // refreshing cities list on page
    this.api.getClients()
  }  


}

/// dialog delete user component
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
  userName = new FormControl('', [Validators.required])
  userEmail = new FormControl('', [Validators.required, Validators.email])

  getUserNameErrorMessage() {
    return this.userName.hasError('required') ? 'You must enter user name' :
              '';
  }

  getUserEmailErrorMessage() {
    return this.userEmail.hasError('required') ? 'You must enter email' :
    this.userEmail.hasError('email') ? 'Not a valid email' :
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