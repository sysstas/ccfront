import { Component, OnInit, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { OrdersService } from '../../services/orders.service';
import {consts} from '../../cosntants';
import {Order} from '../../models/order';

@Pipe({name: 'colorPipe'})
export class ColorPipe implements PipeTransform {
  transform(value) {
    if (value === 0) {
      return 'orange';
    } else if (value === 1) {
      return 'green';
    } else if (value === 2) {
      return 'red';
    }
  }
}
@Pipe({name: 'isPaid'})
export class IsPaid implements PipeTransform {
    transform(value) {
        if (value === 1) {
          return 'Paid';
        } else if (value === 0) {
          return 'Not paid';
        } else if (value === 2) {
          return 'Refunded';
        }
    }
}

@Pipe({name: 'isCompleted'})
export class IsCompleted implements PipeTransform {
  transform(value) {
    if (value === 1) {
      return 'Completed';
    } else if (value === 0) {
      return 'In progress';
    } else if (value === 2) {
      return 'Canceled';
    }
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
  displayedColumns = Order.getOrderColumns();
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
          x.item = x.serviceItem.id;
          x.price = x.serviceItem.price;
          return x;
        });
        this.orders = res;
        console.log('Orders', res);
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

  cancelOrder(id) {
    console.log(id);
    console.log('dataSource1', this.dataSource.data);
    function edit(arr, value) {
       for (const i in arr) {
        if ( arr[i].id === value ) {
          console.log('good deal')
          arr[i].paid = 2;
          arr[i].completed = 2;
          break;
        }
      }
    }
    this.api.openSnackBar(consts.msg.OrderCanceledS);
    this.service.cancelOrder(id).subscribe(() => {
      console.log('refunded');
      edit(this.dataSource.data, id);
      // console.log('response ', res);
      // console.log('dataSource', this.dataSource);

    });
  }
}

