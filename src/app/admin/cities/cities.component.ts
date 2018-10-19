import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { MatDialog } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { CitiesService } from '../../services/cities.service';
import { DialogEditCityComponent } from './dialogs/dialog.edit.city.component';
import { DialogDeleteCityComponent } from './dialogs/dialog.delete.city.component';

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
        this.city.hasError('minLength') ? 'Min length is 2 char' :
            '';
  }

  ngOnInit() {
    this.service.getCities();
  }

  // Clean after submit
  clean(): void {
    this.newCity = '';
    this.city.reset();
  }

  /// open dialog edit city function
  openDialogEditCity(city): void {
    // console.log('openDialogEditCity() says: ', city);
    this.dialog.open(DialogEditCityComponent, {
      width: '250px',
      data: { cityName: city.cityName, ID: city.id}
    });
  }

  /// open dialog delete city function
  openDialogDeleteCity(city): void {
    this.dialog.open(DialogDeleteCityComponent, {
      width: '250px',
      data: { cityName: city.cityName, ID: city.id}
    });
  }

  addNewCity() {
    // calling addCity function on API
    this.service.addCity(this.newCity);
    // refreshing cities list on page
    this.service.getCities();
  }
}





