import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable'
import { ApiService } from '../../api.service';
import { MatPaginator, MatTableDataSource, MatSort, MatProgressSpinnerModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserSubmitedForm } from '../../models/usersubmitedform'

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, AfterViewInit {

  constructor(
    public api: ApiService,  
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.api.loadingSetTrue()
    this.api.getOrders()
    this.api.getMasters()
    this.api.getCities()
    this.api.getClients()
    //console.log(this.dataSource)
  }

  displayedColumns = ['id', 'City', 'ClientEmail', 'ClientName', 'Date','Time','Duration','Master', 'Action'];
  dataSource = new MatTableDataSource(this.api.orders);
  
  newOrder = {
    id: '',
    cityId: '',
    masterId: '',
    userId: '',
    date: '',
    time: '',
    duration: ''
  }

  createNewOrder(){
    this.api.createOrder(this.newOrder);
    this.api.getOrders();
  }

  deleteOrder(id){
    this.api.deleteOrder(id).subscribe(res =>{
      console.log('orders.component deleteOrder', res)
      this.api.getOrdersAfterChange().subscribe(res =>{                    
          this.api.orders = res         
          this.dataSource = new MatTableDataSource(this.api.orders);             
        })        
      //this.openSnackBar('Order succesfully deleted') 
    })   
  }
  
  /// open dialog edit master
  openDialogEditOrder(order): void { 
    console.log("order edit open ", order)
    let dialogRef = this.dialog.open(DialogEditOrder, {
      width: '250px',
      data: { 
        id: order.id,
        cityId: order.cityId, 
        masterId: order.masterId,
        userId: order.client.id,
        date:order.date,
        time: order.time,
        duration: order.duration
      }
    });
    let       data = { 
      id: order.id,
      cityId: order.cityId, 
      masterId: order.masterId,
      userId: order.client.id,
      date:order.date,
      time: order.time,
      duration: order.duration
    }
    console.log("order edit open data", data)
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     // this.animal = result;
    });
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit() {  
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /// FORM VALIDATION PART
  email = new FormControl('', [Validators.required, Validators.email])
  name = new FormControl('', [Validators.required, Validators.minLength(3)])
  city = new FormControl('', [Validators.required])
  date = new FormControl('', [Validators.required])
  time = new FormControl('', [Validators.required])
  size = new FormControl('', [Validators.required])

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter email' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  getNameErrorMessage() {
    return this.name.hasError('required') ? 'Name is required' :
        this.name.hasError('minlength') ? 'Should be at least 3 characters' :
            '';
  }

  getCityErrorMessage() {
    return this.city.hasError('required') ? 'You must choose city' : '';
  }

  getDateErrorMessage() {
    return this.date.hasError('required') ? 'You must choose date' : '';
  }

  getTimeErrorMessage() {
    return this.time.hasError('required') ? 'You must choose time' : '';
  }  

  getSizeErrorMessage() {
    return this.size.hasError('required') ? 'You must choose size' : '';
  } 
  /// Data Picker validation 
  today = new Date()
  minDate = new Date(this.today.setDate(this.today.getDate()+1))
  //////////////////////////////////////////////
 
  //// LOGIC PART //////////////////////////////
  isFormSubmitted = false

  submitedForm = new UserSubmitedForm('','','','','','','')

  workHours = [
    {hour: 8},
    {hour: 9},
    {hour: 10},
    {hour: 11},
    {hour: 12},
    {hour: 13},
    {hour: 14},
    {hour: 15},
    {hour: 16},
    {hour: 17}    
  ]

  clockSize =[
    {
      size: "big",
      workTime: 3
    },
    {
      size: "medium",
      workTime: 2
    },
    {
      size: "small",
      workTime: 1
    }
  ]


  // backToStep1(){
  //   this.isFormSubmitted = false;
  // }  
}

/// dialog edit master
@Component({
  selector: 'dialog-edit',
  templateUrl: 'dialog-edit-order.html',
})
export class DialogEditOrder {

  /// EDIT FORM VALIDATION PART
  masterName = new FormControl('', [Validators.required])
  masterRatingEdit = new FormControl('', [Validators.required])
  masterCity = new FormControl('', [Validators.required])

  getMasterNameErrorMessage() {
    return this.masterName.hasError('required') ? 'Name is required' :
              '';
  }

  getMasterRatingMessage() {
    return this.masterRatingEdit.hasError('required') ? 'Rating is required' :
              '';
  }

  getMasterCityMessage() {
  return this.masterCity.hasError('required') ? 'City is required' :
            '';
  }
  //////////////////////////////////////

  constructor(
    public api: ApiService,
    public dialogRef: MatDialogRef<DialogEditOrder>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    onCloseButtonClick(): void {
    this.dialogRef.close();
  }

  edit(data){
    //console.log("edit is clicked")
    console.log("edit is clicked",data)
    this.api.editOrder(data)
    
  }
}