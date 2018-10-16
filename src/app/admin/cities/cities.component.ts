import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../../api.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import { CitiesService } from '../../services/cities.service';
import { DialogEditCityComponent } from './dialog.edit.city.component';
import { DialogDeleteCityComponent } from './dialog.delete.city.component';

@Component({
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  newCity: string;
  city = new FormControl('', [Validators.required, Validators.minLength(2)]);

  constructor(
    public api: ApiService,
    public service: CitiesService,
    public dialog: MatDialog
  ) { }

  getCityErrorMessage() {
    return this.city.hasError('required') ? 'You must enter city name' :
        this.city.hasError('minlength') ? 'Min length is 2 char' :
            '';
  }

  ngOnInit() {
   // this.api.getMasters()
    this.service.getCities();
   // this.api.getClients()
  }

  // Clean after submit
  clean(): void {
    //
    this.newCity = '';
    this.city.reset();
  }

  /// open dialog edit city function
  openDialogEditCity(city): void {
    console.log('openDialogEditCity() says: ', city);
    const dialogRef = this.dialog.open(DialogEditCityComponent, {
      width: '250px',
      data: { cityName: city.cityName, ID: city.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  /// open dialog delete city function
  openDialogDeleteCity(city): void {
    const dialogRef = this.dialog.open(DialogDeleteCityComponent, {
      width: '250px',
      data: { cityName: city.cityName, ID: city.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  addNewCity() {
    // calling addCity funcnion on API
    this.service.addCity(this.newCity);
    // refreshing cities list on page
    this.service.getCities();
  }
}





