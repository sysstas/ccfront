import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable'
import { ApiService } from '../../api.service';
import { MatPaginator, MatTableDataSource, MatSort, MatProgressSpinnerModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserSubmitedForm } from '../../models/usersubmitedform'


@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.api.getUserOrders()
  }

  displayedColumns = ['ID', 'City', 'Date','Time','Duration','Master'];
  dataSource = new MatTableDataSource(this.api.userOrders);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit() {  
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
  