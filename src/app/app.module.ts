import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouterLinkActive } from '@angular/router' 
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatToolbarModule, 
  MatButtonModule, 
  MatFormFieldModule, 
  MatSelectModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatListModule,
  MatTooltipModule,
  MatDialogModule,
  MatExpansionModule,
  MatIconModule,
  MatSnackBarModule,
  MatTableModule,
  MatPaginatorModule,
  MatTableDataSource,
  MatProgressSpinnerModule} from '@angular/material';
import {MatSortModule} from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import {FormControl, Validators} from '@angular/forms';




import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import { AdminComponent} from './admin/admin.component';
import { NavigationComponent} from './navigation/navigation.component';
import { DialogLogin } from './navigation/dialog-login';
import { MastersComponent, DialogEditMaster, DialogDeleteMaster } from './admin/masters/masters.component';
import { ChoseMasterComponent } from './client/choosemaster/choosemaster.component';
import { ApiService } from './api.service';
import { HttpModule } from '@angular/http';
import { CitiesComponent, DialogEditCity, DialogDeleteCity } from './admin/cities/cities.component';
import { ClientsComponent, DialogEditClient, DialogDeleteClient  } from './admin/clients/clients.component';
import { ScheduleComponent } from './admin/schedule/schedule.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { AuthGuardService } from './auth-guard.service';


const routes: Routes = [
  { path: '', component: ClientComponent},
  { path: 'client', component: ClientComponent},
  { path: 'admin', 
    component: AdminComponent,
    canActivate: [AuthGuardService],
    children: [
      {path: '', redirectTo: 'schedule', pathMatch: 'full'},
      {path: 'schedule', component: ScheduleComponent},
      {path: 'clients', component: ClientsComponent},
      {path: 'masters', component: MastersComponent},
      {path: 'cities', component: CitiesComponent},
      {path: 'orders', component: OrdersComponent}
    ]
  },    
  { path: '**', redirectTo: 'client'}
]

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    AdminComponent,
    NavigationComponent,
    MastersComponent,
    ChoseMasterComponent,
    DialogLogin,
    DialogEditClient,
    DialogEditCity,
    DialogEditMaster,
    DialogDeleteCity,
    DialogDeleteClient,
    DialogDeleteMaster,
    CitiesComponent,
    ClientsComponent,
    ScheduleComponent,
    OrdersComponent
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule, 
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatTooltipModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [NavigationComponent, 
    DialogLogin, 
    AdminComponent,
    DialogEditClient, 
    DialogEditCity, 
    DialogEditMaster,
    DialogDeleteCity,
    DialogDeleteClient,
    DialogDeleteMaster],
  providers: [ApiService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {}

