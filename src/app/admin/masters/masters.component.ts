import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { MatDialog } from '@angular/material';
import { FormControl, Validators} from '@angular/forms';
import { CitiesService } from '../../services/cities.service';
import { MastersService } from '../../services/masters.service';
import { DialogEditMasterComponent } from './dialogs/dialog.edit.master.component';
import { DialogDeleteMasterComponent } from './dialogs/dialog.delete.master.component';
import {consts} from '../../cosntants';
import {NGXLogger} from 'ngx-logger';
import { Master} from '../../models/master';

@Component({
  templateUrl: './masters.component.html',
  styleUrls: ['./masters.component.css']
})
export class MastersComponent implements OnInit {
  masters = [];
  cities = [];
  name: string;
  masterRating = [
    {mark: 1},
    {mark: 2},
    {mark: 3},
    {mark: 4},
    {mark: 5}
  ];
  newMaster = {
    cityId: '',
    masterName : '',
    masterRating: ''
  };
  newMasterName = new FormControl('', [Validators.required]);
  newMasterRatingEdit = new FormControl('', [Validators.required]);
  newMasterCity = new FormControl('', [Validators.required]);

  constructor(
    public citiesService: CitiesService,
    public api: ApiService,
    public service: MastersService,
    public dialog: MatDialog,
    private logger: NGXLogger
  ) { }

  ngOnInit() {
    this.service.getMasters()
    .subscribe(res => {
      this.masters = res;
    });
    this.citiesService.getCities()
    .subscribe(res => {
      this.cities = res;
    });
  }

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

  // Clean after submit
  clean(): void {
    this.newMaster = {
      cityId: '',
      masterName : '',
      masterRating: ''
    };
    this.newMasterName.reset();
    this.newMasterRatingEdit.reset();
    this.newMasterCity.reset();
  }

  // Add master
  addNewMaster() {
    // calling addMaster function on API
    this.service.addMaster(this.newMaster)
      .subscribe(res => {
        // Because we don't want to do additional http call for get all masters after change
        // and we need to display new master information, but in returned object we don't have cityName - only cityId.
        // we need to change in masters array proper element to display new data filling it with proper city property
        //
        // Creating temporary array
        const arr = [];
        arr.push(res);
        // Add cityName to master instance for correct displaying
        arr[0].city = this.cities.find( elem => {
          return elem.id === arr[0].cityId;
        });
        // refreshing masters list on page
        this.masters.push(arr[0]);
        this.logger.debug(`Master "${arr[0].masterName}" successfully added`);
        this.api.openSnackBar(consts.msg.MasterSavedS);
      });
  }

  /// Edit master
  openDialogEditMaster(master): void {
    const dialogRef = this.dialog.open(DialogEditMasterComponent, {
      width: '250px',
      data: { masterName: master.masterName, id: master.id, masterRating: master.masterRating, cityID: master.city.id, cities: this.cities }
    });
    dialogRef.afterClosed().subscribe(res => {
      // Because we don't want to do additional http call for get all masters after change
      // and we need to display new master information, but in returned object we don't have cityName - only cityId.
      // we need to change in masters array proper element to display new data filling it with proper city property
      //
      // Creating temporary array
      const arr = [];
      arr.push(res);
      // Adding property city to changed element
      arr[0].city = this.cities.find( elem => {
        return elem.id === arr[0].cityID;
      });
      // Finding necessary element index
      const  changedArrayElement = this.masters.findIndex((obj => obj.id === master.id));
      // Changing element in masters array to new element
      this.masters[changedArrayElement] = arr[0];
      this.api.openSnackBar(consts.msg.MasterSavedS);
      this.logger.debug(`Master "${arr[0].masterName}" successfully changed`);
    });
  }

  /// Delete master
  openDialogDeleteMaster(master): void {
    const dialogRef = this.dialog.open(DialogDeleteMasterComponent, {
      width: '250px',
      data: { masterName: master.masterName, id: master.id}
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res === true) {
        this.masters = this.masters.filter(function (item) {
          return item.id !== master.id;
        });
        this.logger.debug(`Master "${master.masterName}" successfully deleted`);
        this.api.openSnackBar(consts.msg.MasterDeletedS);
      }
    });
  }
}
