import { Injectable, Injector } from '@angular/core';
import { ResourcesService } from 'src/app/core/resources-service/resources.service';
import { Resource } from 'src/app/enums/resource.enum';
import { Order } from 'src/app/models/order-model';

@Injectable()
export class CompletedOrdersService extends ResourcesService<Order> {
  constructor(injector: Injector) {
    super(injector, Resource.Order);
  }
}