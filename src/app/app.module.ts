import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router' 
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
  MatIconModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import {FormControl, Validators} from '@angular/forms';




import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import { AdminComponent, 
  DialogOverviewExampleDialog, 
  DialogEditCity } from './admin/admin.component';
import { NavigationComponent} from './navigation/navigation.component';
import { DialogLogin } from './navigation/dialog-login';
import { MastersComponent, DialogEditMaster } from './admin/masters/masters.component';
import { ChoseMasterComponent } from './client/choosemaster/choosemaster.component';
import { ApiService } from './api.service';
import { HttpModule } from '@angular/http';
import { DialogEdit } from './admin/dialog-edit';


const routes: Routes = [
  { path: '', component: ClientComponent},
  { path: 'client', component: ClientComponent},
  { path: 'admin', component: AdminComponent},  
  { path: 'admin/masters', component: MastersComponent},
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
    DialogEdit,
    DialogOverviewExampleDialog,
    DialogEditCity,
    DialogEditMaster
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
    MatIconModule
  ],
  entryComponents: [NavigationComponent, DialogLogin, AdminComponent, DialogEdit, DialogOverviewExampleDialog, DialogEditCity, DialogEditMaster],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule {}

