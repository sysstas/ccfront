import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { MatDialog } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { DialogEditClientComponent } from './dialog.edit.client.component';
import { DialogDeleteClientComponent } from './dialog.delete.client.component';
import { ClientsService } from '../../services/clients.service';

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
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  name: string;
  newUser = { userName: '', userEmail: '' };
  userName = new FormControl('', [Validators.required]);
  userEmail = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    public api: ApiService,
    public dialog: MatDialog,
    public service: ClientsService
  ) { }

  ngOnInit() {
    // this.api.getOrders();
    this.service.getClients();
  }

  getUserNameErrorMessage() {
    return this.userName.hasError('required') ? 'You must enter user name' :
              '';
  }

  getUserEmailErrorMessage() {
    return this.userEmail.hasError('required') ? 'You must enter email' :
    this.userEmail.hasError('email') ? 'Not a valid email' :
    '';
  }

  // Clean after submit
  clean(): void {
    console.log();
    this.newUser = {
      userName: '',
      userEmail: ''
    };
    this.userName.reset();
    this.userEmail.reset();
  }

  /// open dialog delete client function
  openDialogDeleteUser(user): void {
    this.dialog.open(DialogDeleteClientComponent, {
      width: '250px',
      data: { userName: user.userName, id: user.id}
    });
  }

  /// open dialog edit user function
  openDialog(user): void {
    this.dialog.open(DialogEditClientComponent, {
      width: '250px',
      data: { userName: user.userName, id: user.id, userEmail: user.userEmail }
    });
  }

  addNewUser() {
    this.service.addClient(this.newUser);
    // refreshing cities list on page
    this.service.getClients();
  }
}
