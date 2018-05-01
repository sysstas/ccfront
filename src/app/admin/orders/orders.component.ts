import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { ApiService } from '../../api.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, AfterViewInit {

  constructor(
    public api: ApiService) { }

  ngOnInit() {
    this.api.getOrders()
  }

  displayedColumns = ['ID', 'City', 'ClientEmail', 'ClientName', 'Date','Time','Duration','Master', 'Action'];
  dataSource = new MatTableDataSource(this.api.orders);
  
  deleteOrder(id){
    this.api.deleteOrder(id)
    
  }
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit() {  
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  
}

// export interface Element {
//   _id: String,
//   city: String, 
//   clientEmail: String, 
//   clientName: String, 
//   date: String,
//   time: Number,
//   duration: Number,
//   master: String
// }