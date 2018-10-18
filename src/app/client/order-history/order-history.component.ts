import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../api.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { UserAccountService } from '../../services/user-account.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  userOrders = [];
  displayedColumns = ['id', 'cityName', 'date', 'time', 'duration', 'masterName'];
  dataSource = new MatTableDataSource();

  constructor(public api: ApiService,  public service: UserAccountService) { }

  ngOnInit() {
    this.service.getUserOrders()
    .subscribe(res => {
      this.service.userOrders = res;
      this.dataSource = new MatTableDataSource(this.service.userOrders);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
}
