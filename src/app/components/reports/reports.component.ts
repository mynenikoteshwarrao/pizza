import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'src/app/service/order/order.service';
import { UntilDestroy } from '@ngneat/until-destroy';
import { first, map } from 'rxjs/operators';
import { Order } from 'src/app/models/order-model';
import { Status } from 'src/app/enums/status.enum';

@UntilDestroy()
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  providers: [OrderService]
})
export class ReportsComponent implements OnInit, OnDestroy {
  private orders: Order[];

  public orderPlaced = 0;
  public inprogress = 0;
  public completed = 0;
  public vegCompleted = 0;
  public nonVegCompleted = 0;
  public ready = 0;

  private inProgressStates = [Status.PREPARATION, Status.INOVEN, Status.QUALITYCHECK];

  constructor(private orderService: OrderService) {}

  public ngOnInit(): void {
    this.loadData();
  }

  public ngOnDestroy(): void {}

  private loadData(): void {
    this.orderService
      .list()
      .pipe(first())
      .pipe(
        map((orders) => {
          this.orders = orders;
          this.runReport(this.orders);
        })
      )
      .subscribe();
  }

  private runReport(orders: Order[]): void {
    this.orderPlaced = orders.length;
    this.inprogress = orders.filter(order => this.inProgressStates.includes(order.status)).length;
    this.completed = orders.filter(order => order.status === Status.COMPLETED).length;
    this.ready = orders.filter(order => order.status === Status.READY).length;
    this.vegCompleted = orders.filter(order => !order.isNonVeg && (order.status === Status.COMPLETED ||  order.status === Status.READY)).length;
    this.nonVegCompleted = orders.filter(order => order.isNonVeg && (order.status === Status.COMPLETED ||  order.status === Status.READY)).length;
  }
}
