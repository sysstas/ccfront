import { Component, OnInit, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { OrdersService } from '../../services/orders.service';
import {consts} from '../../cosntants';


@Pipe({name: 'isPaid'})
export class IsPaid implements PipeTransform {
    transform(value) {
        return value ? 'Paid' : 'Not paid';
    }
}

@Pipe({name: 'isCompleted'})
export class IsCompleted implements PipeTransform {
    transform(value) {
        return value ? 'Completed' : 'In progress';
    }
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  orders = [];
  displayedColumns = ['id', 'city', 'userEmail', 'userName', 'date', 'time', 'duration', 'master', 'paid', 'completed', 'Action'];
  dataSource = new MatTableDataSource();
  email = new FormControl('', [Validators.required, Validators.email]);
  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  city = new FormControl('', [Validators.required]);
  date = new FormControl('', [Validators.required]);
  time = new FormControl('', [Validators.required]);
  size = new FormControl('', [Validators.required]);

  constructor(
    public api: ApiService,
    public service: OrdersService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.service.getOrders()
    .subscribe(res => {
      if (res) {
        res.map( function(x) {
          x.city = x.city.cityName;
          x.master = x.master.masterName;
          x.userName = x.user.userName;
          x.userEmail = x.user.userEmail;
          return x;
        });
        this.orders = res;
        // console.log('Component get 1: ', this.dataSource.data.length);
        this.dataSource = new MatTableDataSource(this.orders);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // console.log('Component get 1: ',  this.dataSource.sort);
        // console.log('Component get orders: ', this.dataSource);
      }
    });
  }

  deleteOrder(id) {
    console.log(id);
    this.service.deleteOrder(id).subscribe(() => {
      // console.log('COMPONENT Order deleted: ', id);
      function remove(array, element) {
        return array.filter(e => e.id !== element);
      }
      this.dataSource.data = remove(this.dataSource.data, id);
      this.api.openSnackBar(consts.msg.OrderDeletedS);
    });
  }

}

