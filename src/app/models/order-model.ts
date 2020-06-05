import { Crust } from './crust-model';
import { Topping } from './topping-model';
import { Base } from './base-model';
import { Status } from '../enums/status.enum';
import { Sauce } from './sauce-model';

export class Order extends Base<Order> {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public phone: string;
  public crust: Crust;
  public sauce: Sauce;
  public toppings: Topping[];
  public orderTime: Date;
  public status: Status;
  public price: number;
  public isNonVeg: boolean;
  public makingTime: number;
  public waitingTime: number;
  public timeToCompleteLabel: string;
  public processRunTime: number;
}
