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

  displayedColumns = ['ID', 'City', 'ClientEmail', 'ClientName', 'Date','Time','Duration','Master', 'Action'];
  dataSource = new MatTableDataSource(this.api.orders);
  
  newOrder = {
    ID: '',
    cityID: '',
    masterID: '',
    clientID: '',
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
        cityID: order.cityID, 
        masterID: order.masterID,
        clientID: order.client.id,
        date:order.date,
        time: order.time,
        duration: order.duration
      }
    });
    let       data = { 
      id: order.id,
      cityID: order.cityID, 
      masterID: order.masterID,
      clientID: order.client.id,
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


  // makeOrder(master) {
  //    this.api.createOrder()
    
  // }
  // makeOrder(master) {
  //   let oderInfo = {
  //     id: master._id,
  //     masterName: master.name,
  //     date: Date.parse(this.submitedForm.date.toString()),
  //     dateMsg: this.submitedForm.date,
  //     time: this.submitedForm.busy,
  //     userName: this.submitedForm.name,
  //     userEmail: this.submitedForm.email,
  //     city: this.submitedForm.city
  //   }
  //   this.api.createOrder(oderInfo)
  //   .subscribe(res => {
  //     if (res){
  //       console.log('master schedule updated')        
  //        this.api.getOrdersAfterChange().subscribe(res =>{
  //         if (res){
  //           this.api.orders = res.json()         
  //           this.dataSource = new MatTableDataSource(this.api.orders); 
  //         } 
  //       })
  //     }
  //   })
    
    
  //   // Clear form and page to initial state
  //   this.isFormSubmitted = false
  //   this.submitedForm = new ClientSubmitedForm('','', '','','','',[])
  //   this.api.arr = []
  //   this.email = new FormControl('', [Validators.required, Validators.email])
  //   this.name = new FormControl('', [Validators.required, Validators.minLength(3)])
  //   this.city = new FormControl('', [Validators.required])
  //   this.date = new FormControl('', [Validators.required])
  //   this.time = new FormControl('', [Validators.required])
  //   this.size = new FormControl('', [Validators.required])    
  // }

  // find() {     
  //   // this for changing layout when client 
  //   this.isFormSubmitted = true;
  //   this.workiHoursAnalizer(this.submitedForm.startHour, this.submitedForm.workTime)    
  //   // forming query object
  //   let query = {
  //     city: this.submitedForm.city,
  //     date: Date.parse(this.submitedForm.date.toString()),
  //     time: this.submitedForm.busy
  //   }
  //   let clientData = {
  //     name: this.submitedForm.name,
  //     email: this.submitedForm.email
  //   }
  //   this.api.getFreeMasters(query)
  //   // Add new client to database
  //   this.api.addClient(clientData)
  // }

  backToStep1(){
    this.isFormSubmitted = false;
  }
  
  // forms array of busi hours for submitted form data
  // workiHoursAnalizer(start:any, duration:any){
  //   let time = []
  //   time.push(start)
  //   if (duration === 3) {
  //     time.push(start+1)
  //     time.push(start+2) 
  //   } else if (duration === 2){
  //     time.push(start+1)      
  //   } 
  //   this.submitedForm.busy = time    
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