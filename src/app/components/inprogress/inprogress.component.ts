import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'src/app/service/order/order.service';
import { Order } from 'src/app/models/order-model';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { map, timeInterval, delay, first } from 'rxjs/operators';
import { Status } from 'src/app/enums/status.enum';
import { Subscription, timer, of } from 'rxjs';
import { StageTime } from 'src/app/enums/stage-time.enum';

@UntilDestroy()
@Component({
  selector: 'app-inprogress',
  templateUrl: './inprogress.component.html',
  styleUrls: ['./inprogress.component.scss'],
  providers: [OrderService],
})
export class InprogressComponent implements OnInit, OnDestroy {
  public orders: Order[];
  public displayedColumns: string[] = ['id', 'lastName', 'details', 'stage', 'time'];
  private timerSubscription: Subscription = new Subscription();

  constructor(private orderService: OrderService) {}

  public ngOnInit(): void {
    this.loadData();
  }
  public ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

  private loadData(): void {
    this.orderService
      .list()
      .pipe(first())
      .pipe(
        map((orders) => {
          this.orders = orders.filter((orders) => orders.status !== Status.READY && orders.status !== Status.COMPLETED);
          this.initiateOrders(this.orders);
        })
      )
      .subscribe();
  }

  public toppingNames(order: Order): string[] {
    return order.toppings.map((topping) => topping.name);
  }

  private initiateOrders(orders: Order[]): void {
    if (orders.length > 0) {
      this.calculateTime(orders);
      this.startMaking(orders[0]);
    }
  }

  private startMaking(order: Order): void {
    this.initiateNextStage(order);
  }

  private nextStage(status: Status): Status {
    switch (status) {
      case Status.WAITING:
        return Status.PREPARATION;
      case Status.PREPARATION:
        return Status.INOVEN;
      case Status.INOVEN:
        return Status.QUALITYCHECK;
      case Status.QUALITYCHECK:
        return Status.READY;
      default:
        break;
    }
    return Status.WAITING;
  }

  private initiateNextStage(order: Order): void {
    if (this.nextStage(order.status) === Status.READY) {
      this.completeOrder(order);
      return;
    }
    order.status = this.nextStage(order.status);
    switch (order.status) {
      case Status.PREPARATION:
        order.processRunTime = this.toppingsPreparationTime(order);
        break;
      case Status.INOVEN:
        order.processRunTime = StageTime.INOVEN;
        break;
      case Status.QUALITYCHECK:
        order.processRunTime = StageTime.QUALITYCHECK;
        break;
      default:
        break;
    }
    this.processStage(order);
  }

  private processStage(order: Order): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.timerSubscription = timer(order.processRunTime * 1000).subscribe(() => {
      this.initiateNextStage(order);
    });
  }

  private completeOrder(order: Order): void {
    order.status = Status.READY;
    this.orderService
      .update(order)
      .pipe(first())
      .pipe(
        map((orders) => {
          this.loadData();
        })
      )
      .subscribe();
  }

  private calculateTime(orders: Order[]) {
    orders.forEach((order) => {
      order.makingTime = this.calculateMakingTime(order);
    });

    const pizzaMakingWeight = orders.map((order) => order.makingTime);
    for (let token = 0; token < orders.length; token++) {
      const order = orders[token];
      order.waitingTime = this.calculateWaitingTime(token, pizzaMakingWeight);
      order.timeToCompleteLabel = this.constructTimeLabel(order.waitingTime + order.makingTime);
    }
  }

  private calculateMakingTime(order: Order): number {
    let time = StageTime.INOVEN + StageTime.QUALITYCHECK;
    time += this.toppingsPreparationTime(order);
    return time;
  }

  private toppingsPreparationTime(order: Order): number {
    return StageTime.TOPPINGTIME * order.toppings.length;
  }

  private calculateWaitingTime(tokenNumber: number, pizzaPreparationTimes: number[]): number {
    let d = 0;
    if (tokenNumber > 0) {
      d = pizzaPreparationTimes.slice(0, tokenNumber).reduce((t, n) => {
        return t + n;
      });
    }
    return d;
  }

  private constructTimeLabel(totalTime: number): string {
    return Math.floor(totalTime / 60) + ' mins ' + Math.floor(totalTime % 60) + ' sec';
  }
}
