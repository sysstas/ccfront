import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {MatSortModule} from '@angular/material/sort';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import {AuthServiceConfig, GoogleLoginProvider, SocialLoginModule,} from 'angular-6-social-login';
import {NgxPayPalModule} from 'ngx-paypal';
import {AppComponent} from './app.component';
import {ClientComponent} from './client/client.component';
import {AdminComponent} from './admin/admin.component';
import {NavigationComponent} from './navigation/navigation.component';
import {DialogLogin} from './navigation/dialogs/dialog-login';
import {MastersComponent} from './admin/masters/masters.component';
import {ApiService} from './api.service';
import {CitiesComponent} from './admin/cities/cities.component';
import {ClientsComponent, IsAdmin} from './admin/clients/clients.component';
import {NewOrderComponent} from './client/neworder.component';
import {ScheduleComponent} from './admin/schedule/schedule.component';
import {IsCompleted, IsPaid, ColorPipe, OrdersComponent} from './admin/orders/orders.component';
import {AuthGuardService} from './auth-guard.service';
import {AuthInterceptorService} from './authInterceptor.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {UserAccountComponent} from './client/user-account/user-account.component';
import {OrderHistoryComponent} from './client/order-history/order-history.component';
import {UserAccountService} from './services/user-account.service';
import {DialogEditClientComponent} from './admin/clients/dialogs/dialog.edit.client.component';
import {DialogDeleteClientComponent} from './admin/clients/dialogs/dialog.delete.client.component';
import {ClientsService} from './services/clients.service';
import {CitiesService} from './services/cities.service';
import {DialogEditCityComponent} from './admin/cities/dialogs/dialog.edit.city.component';
import {DialogDeleteCityComponent} from './admin/cities/dialogs/dialog.delete.city.component';
import {MastersService} from './services/masters.service';
import {DialogEditMasterComponent} from './admin/masters/dialogs/dialog.edit.master.component';
import {DialogDeleteMasterComponent} from './admin/masters/dialogs/dialog.delete.master.component';
import {OrdersService} from './services/orders.service';
import { LoggerModule } from 'ngx-logger';
import { environment } from '../environments/environment';
import {Auth0Service} from './auth/auth.service';
import { CallbackComponent } from './callback/callback.component';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthGuardAdminService} from './services/auth-guard-admin.service';
import {StorageService} from './services/storage.service';
import { SettingsComponent } from './admin/settings/settings.component';
import {SettingsService} from './services/settings.service';
import { DialogEditItemComponent } from './admin/settings/dialogs/dialog-edit-item.component';
import { DialogDeleteItemComponent } from './admin/settings/dialogs/dialog-delete-item.component';
import {ScheduleService} from './services/schedule.service';
import {MatRadioModule} from '@angular/material/radio';



const routes: Routes = [
  { path: '', component: ClientComponent},
  { path: 'client', component: ClientComponent},
  { path: 'callback', component: CallbackComponent},
  { path: 'account', component: UserAccountComponent, canActivate: [AuthGuardService]},
  { path: 'history', component: OrderHistoryComponent, canActivate: [AuthGuardService]},
  { path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardAdminService],
    children: [
      {path: '', redirectTo: 'clients', pathMatch: 'full'},
      {path: 'schedule', component: ScheduleComponent},
      {path: 'clients', component: ClientsComponent},
      {path: 'masters', component: MastersComponent},
      {path: 'cities', component: CitiesComponent},
      {path: 'orders', component: OrdersComponent},
      {path: 'settings', component: SettingsComponent},
    ]
  },
  { path: 'neworder', component: NewOrderComponent},
  { path: '**', redirectTo: 'client'}
];

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    NewOrderComponent,
    AdminComponent,
    NavigationComponent,
    MastersComponent,
    DialogLogin,
    DialogEditClientComponent,
    DialogEditMasterComponent,
    DialogDeleteCityComponent,
    DialogDeleteClientComponent,
    DialogDeleteMasterComponent,
    CitiesComponent,
    ClientsComponent,
    ScheduleComponent,
    OrdersComponent,
    IsAdmin,
    IsPaid,
    ColorPipe,
    IsCompleted,
    UserAccountComponent,
    OrderHistoryComponent,
    DialogEditCityComponent,
    CallbackComponent,
    SettingsComponent,
    DialogEditItemComponent,
    DialogDeleteItemComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
    MatCardModule,
    MatProgressSpinnerModule,
    NgxPayPalModule,
    LoggerModule.forRoot({level: environment.logger}),
    MatRadioModule
  ],
  entryComponents: [NavigationComponent,
    DialogLogin,
    AdminComponent,
    DialogEditClientComponent,
    DialogEditCityComponent,
    DialogEditMasterComponent,
    DialogDeleteCityComponent,
    DialogDeleteClientComponent,
    DialogDeleteMasterComponent,
    DialogEditItemComponent,
    DialogDeleteItemComponent],
  providers: [
    ApiService,
    UserAccountService,
    ClientsService,
    CitiesService,
    MastersService,
    OrdersService,
    AuthGuardService,
    AuthGuardAdminService,
    Auth0Service,
    JwtHelperService,
    StorageService,
    SettingsService,
    ScheduleService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

