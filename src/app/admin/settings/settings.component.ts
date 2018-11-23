import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ApiService} from '../../api.service';
import {SettingsService} from '../../services/settings.service';
import {NGXLogger} from 'ngx-logger';
import { MatDialog } from '@angular/material';
import {DialogEditItemComponent} from './dialogs/dialog-edit-item.component';
import {consts} from '../../cosntants';
import {DialogDeleteItemComponent} from './dialogs/dialog-delete-item.component';



@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  clockSize = [];

  constructor(
    public api: ApiService,
    public settings: SettingsService,
    private logger: NGXLogger,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.settings.getItems()
      .subscribe(res => {
        this.clockSize = res;
      });
  }

  openDialogEditItem(item): void {
    // Call dialog
    const dialogRef = this.dialog.open(DialogEditItemComponent, {
      width: '250px',
      data: { clockSize: item.clockSize, workHours: item.workHours, price: item.price, id: item.id}
    });
    dialogRef.afterClosed().subscribe( res => {
      // Creating temporary array
      const arr = [];
      arr.push(item);
      arr[0].workHours = res.workHours;
      arr[0].price = res.price;
      arr[0].clockSize = res.clockSize;

      this.api.openSnackBar(consts.msg.ItemSavedS);
      this.logger.debug(`Item successfully changed: size:${res.clockSize}; duration:${res.workHours}; price:${res.price}`);
    });
  }

  openDialogDeleteItem(item): void {
    // Call dialog
    const deleteProcessingResult = this.dialog.open(DialogDeleteItemComponent, {
      width: '250px',
      data: { clockSize: item.clockSize, id: item.id}
    });
    // Changing cities array after deletion of city for refreshing view
    deleteProcessingResult.afterClosed().subscribe( res => {
      if (res === true) {
        this.clockSize = this.clockSize.filter(function(elem) {
          return elem.id !== item.id;
        });
        this.logger.debug(`Item "${item.clockSize}" successfully deleted`);
        this.api.openSnackBar(consts.msg.ItemDeletedS);
      }
    });
  }
}
