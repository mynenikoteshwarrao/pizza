
import { Injectable, Injector } from '@angular/core';
import { ResourcesService } from 'src/app/core/resources-service/resources.service';
import { Resource } from 'src/app/enums/resource.enum';
import { Topping } from 'src/app/models/topping-model';

@Injectable()
export class ToppingsService extends ResourcesService<Topping> {
  constructor(injector: Injector) {
    super(injector, Resource.Topping);
  }
}