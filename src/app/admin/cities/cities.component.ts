import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { MatDialog } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { CitiesService } from '../../services/cities.service';
import { DialogEditCityComponent } from './dialogs/dialog.edit.city.component';
import { DialogDeleteCityComponent } from './dialogs/dialog.delete.city.component';
import { consts } from '../../cosntants';
import {NGXLogger} from 'ngx-logger';
import {_if} from 'rxjs-compat/observable/if';

@Component({
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  newCity: string;
  city = new FormControl('', [Validators.required, Validators.minLength(2)]);
  cities = [];
  constructor(
    public api: ApiService,
    public service: CitiesService,
    public dialog: MatDialog,
    private logger: NGXLogger
  ) { }

  getCityErrorMessage() {
    return this.city.hasError('required') ? 'You must enter city name' :
        this.city.hasError('minLength') ? 'Min length is 2 char' :
            '';
  }

  ngOnInit() {
    this.service.getCities()
      .subscribe(res => {
        this.cities = res;
      });
  }

  // Clean after submit
  clean(): void {
    this.newCity = '';
    this.city.reset();
  }

  // Add new city
  addNewCity() {
    // calling addCity function on API
    this.service.addCity(this.newCity)
      .subscribe(res => {
        this.cities.push(res);
        this.logger.debug(`city "${this.cities[this.cities.length - 1].cityName}" successfully added`);
        this.api.openSnackBar(consts.msg.CitySavedS);
      });
  }

  /// Edit city
  openDialogEditCity(city): void {
    // Call dialog
    const dialogRef = this.dialog.open(DialogEditCityComponent, {
      width: '250px',
      data: { cityName: city.cityName, ID: city.id}
    });
    dialogRef.afterClosed().subscribe( res => {
      // Refresh view without http call
      const arr = [];
      arr.push(city);
      arr[0].cityName = res.cityName;
      // logging result
      this.logger.debug(`city "${city.cityName}" successfully changed to "${res}"`);
      // displaying result to user
      this.api.openSnackBar(consts.msg.CitySavedS);
    });
  }

  /// open dialog delete city function
  openDialogDeleteCity(city): void {
    // Call dialog
    const deleteProcessingResult = this.dialog.open(DialogDeleteCityComponent, {
      width: '250px',
      data: { cityName: city.cityName, ID: city.id}
    });
    // Changing cities array after deletion of city for refreshing view
    deleteProcessingResult.afterClosed().subscribe( res => {
      if (res === true) {
        this.cities = this.cities.filter(function(item) {
          return item.id !== city.id;
        });
        this.logger.debug(`city "${city.cityName}" successfully deleted`);
        this.api.openSnackBar(consts.msg.CityDeletedS);
      }
    });
  }
}





