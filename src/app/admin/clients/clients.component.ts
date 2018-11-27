import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { MatDialog } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { DialogEditClientComponent } from './dialogs/dialog.edit.client.component';
import { DialogDeleteClientComponent } from './dialogs/dialog.delete.client.component';
import { ClientsService } from '../../services/clients.service';
import {consts} from '../../cosntants';
import {NGXLogger} from 'ngx-logger';

@Pipe({name: 'isAdmin'})
export class IsAdmin implements PipeTransform {
    transform(value) {
        return value ? 'Admin' : 'User';
    }
}
// @Pipe({name: 'isReg'})
// export class IsReg implements PipeTransform {
//     transform(value) {
//         return value ? 'Registered' : 'Not registered';
//     }
// }

@Component({
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  users = [];
  name: string;
  newUser = { userName: '', userEmail: '' };
  userName = new FormControl('', [Validators.required]);
  userEmail = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    public api: ApiService,
    public dialog: MatDialog,
    public service: ClientsService,
    private logger: NGXLogger
  ) { }

  ngOnInit() {
    this.service.getClients()
    .subscribe(res => {
      this.users = res;
    });
  }

  // Add new user
  addNewUser() {
    this.service.addClient(this.newUser)
      .subscribe(res => {{
        // Because we don't want to do additional http call for get all users after we added new one
        // and we need to display new user information, but in returned object we don't have userEmail -
        // we need to change in users array proper element to display new data filling it with proper userEmail property
        //
        // Creating temporary array
        const arr = [];
        arr.push(res);
        // make complete element (temporary)
        arr[0].userEmail = this.newUser.userEmail;
        // pushing this element to an array
        this.users.push(arr[0]);
        this.logger.debug(`User "${this.newUser.userName}" successfully added`);
        this.api.openSnackBar(consts.msg.ClientSavedS);
        // cleaning form
        this.clean();
      }});
    // refreshing cities list on page
    this.service.getClients();
  }

  /// Edit user
  openDialog(user): void {
    const dialogRef = this.dialog.open(DialogEditClientComponent, {
      width: '250px',
      data: { userName: user.userName, id: user.id, userEmail: user.userEmail }
    });
    dialogRef.afterClosed().subscribe(res => {
      // We don't want to do additional http call for get all masters after change
      // but we need to display new master information. Using MAT_DIALOG_DATA binded with fields we want to
      // change - here it is userName and userEmail, we can simply create dummy array, push in it data we passed to child component
      // and change properties with response data from child components.
      //
      // Creating temporary array
      const arr = [];
      // Pushing in it initial data which we passed to child component
      arr.push(user);
      // Change initial data to data from response. Angular will automatically change view
      arr[0].userName = res.userName;
      arr[0].userEmail = res.userEmail;
      // Displaying changes to user
      this.api.openSnackBar(consts.msg.ClientSavedS);
      // Logging result.
      this.logger.debug(`Master "${arr[0].userName}" successfully changed`);
    });
  }

  /// Delete user
  openDialogDeleteUser(user): void {
    const dialogRef = this.dialog.open(DialogDeleteClientComponent, {
      width: '250px',
      data: { userName: user.userName, id: user.id}
    });
    dialogRef.afterClosed().subscribe( res => {
      if (res === true) {
        // removing user from the view
        this.users = this.users.filter(function(item) {
          return item.id !== user.id;
        });
        // Logging result
        this.logger.debug(`User "${user.userName}" successfully deleted`);
        // Displaying result to user
        this.api.openSnackBar(consts.msg.ClientDeletedS);
      }
    });
  }

  getUserNameErrorMessage() {
    return this.userName.hasError('required') ? consts.valMsg.NameIsRequired :
              '';
  }

  getUserEmailErrorMessage() {
    return this.userEmail.hasError('required') ? consts.valMsg.MustEnterEmail :
    this.userEmail.hasError('email') ? consts.valMsg.NotValidEmail :
    '';
  }

  // Clean after submit
  clean(): void {
    this.newUser = {
      userName: '',
      userEmail: ''
    };
    this.userName.reset();
    this.userEmail.reset();
  }


}
