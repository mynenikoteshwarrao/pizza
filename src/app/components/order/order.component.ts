import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from 'src/app/models/order-model';
import { Crust } from 'src/app/models/crust-model';
import { OrderService } from 'src/app/service/order/order.service';
import { SauceService } from 'src/app/service/sauce/sauce.service';
import { ToppingsService } from 'src/app/service/toppings/toppings.service';
import { CrustService } from 'src/app/service/crust/crust.service';
import { Sauce } from 'src/app/models/sauce-model';
import { Topping } from 'src/app/models/topping-model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, first } from 'rxjs/operators';
import { BottomSheetService } from 'src/app/core/utils/bottomSheet.service';
import { Status } from 'src/app/enums/status.enum';

@UntilDestroy()
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [OrderService, SauceService, ToppingsService, CrustService],
})
export class OrderComponent implements OnInit, OnDestroy {
  public orderForm: FormGroup;
  public order: Order;
  public previousOrder: Order;
  public crusts: Crust[];
  public sauces: Sauce[];
  public toppings: Topping[];
  public pizzaPrice: number = 0;

  constructor(
    public sauceService: SauceService,
    public toppingsService: ToppingsService,
    public crustService: CrustService,
    private service: OrderService,
    private fb: FormBuilder,
    private bottomSheetService: BottomSheetService
  ) {}

  public ngOnInit(): void {
    this.order = new Order();
    this.loadData();
    this.createForm();
  }

  public ngOnDestroy(): void {}

  private loadData(): void {
    this.crustService
      .list()
      .pipe(untilDestroyed(this))
      .pipe(
        map((crusts) => {
          this.crusts = crusts;
        })
      )
      .subscribe();

    this.sauceService
      .list()
      .pipe(untilDestroyed(this))
      .pipe(
        map((sauces) => {
          this.sauces = sauces;
        })
      )
      .subscribe();

    this.toppingsService
      .list()
      .pipe(untilDestroyed(this))
      .pipe(
        map((toppings) => {
          this.toppings = toppings;
        })
      )
      .subscribe();
  }

  public save(): void {
    this.order = this.orderForm.value as Order;
    this.order.status = Status.WAITING;
    this.order.orderTime = new Date();
    this.calculatePizzaCost(this.order);
    this.service
      .create(this.order)
      .pipe(first())
      .pipe(
        map((order) => {
          this.previousOrder = order;
          this.bottomSheetService.information = [`Order successfully place, Order number ${order.id}`];
          this.reset();
        })
      )
      .subscribe();
  }


  public optionsSelected(): void {
    this.order = this.orderForm.value as Order;
    this.calculatePizzaCost(this.order);
    this.isNonVegPizza(this.order);
  }

  private calculatePizzaCost(order: Order): number {
    if (!order.crust || !order.sauce || order.toppings?.length === 0) {
      return 0;
    }
    let price = order.crust.price + order.sauce.price;
    price += order.toppings
      .map((topping) => topping.price)
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((t, n) => {
        return t + n;
      });

    order.price = price;
    return price;
  }

  private isNonVegPizza(order: Order): boolean {
    if(order.toppings){
        order.isNonVeg = order.toppings.filter((topping) => topping.isNonVeg).length > 0;
    }
    return order.isNonVeg;
  }

  private createForm(): void {
    this.orderForm = this.fb.group({
      firstName: [null],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern("^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")]],
      phone: [null, [Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]*$")]],
      crust: [null, [Validators.required]],
      sauce: [null, [Validators.required]],
      toppings: [[], [Validators.required, Validators.minLength(3)]],
    });
  }

  public reset(): void {
    this.orderForm.reset();
    this.orderForm.markAsPristine();
    this.orderForm.markAsUntouched();
    Object.keys(this.orderForm.controls).forEach((name) => {
      let control = this.orderForm.controls[name];
      control.setErrors(null);
    });
    this.optionsSelected();
  }
}
