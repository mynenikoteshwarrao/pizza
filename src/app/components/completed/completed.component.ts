import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'src/app/service/order/order.service';
import { Order } from 'src/app/models/order-model';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { map } from 'rxjs/operators';
import { Status } from 'src/app/enums/status.enum';

@UntilDestroy()
@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss'],
  providers: [OrderService],
})
export class CompletedComponent implements OnInit , OnDestroy{

  public orders: Order[];
  public displayedColumns: string[] = ['id', 'lastName', 'details', 'stage'];

  constructor( private orderService: OrderService) { }

  public ngOnInit(): void {
    this.loadData();
  }
  public ngOnDestroy(): void {}

  private loadData(): void {
    this.orderService
      .list()
      .pipe(untilDestroyed(this))
      .pipe(
        map((orders) => {
          this.orders = orders.filter(orders => orders.status !== Status.WAITING );
        })
      )
      .subscribe();
  }

  public toppingNames(order: Order): string[] {
    return order.toppings.map((topping) => topping.name);
  }

}
