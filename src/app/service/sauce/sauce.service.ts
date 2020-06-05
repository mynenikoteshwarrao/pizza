import { Injectable, Injector } from '@angular/core';
import { ResourcesService } from 'src/app/core/resources-service/resources.service';
import { Resource } from 'src/app/enums/resource.enum';
import { Sauce } from 'src/app/models/sauce-model';

@Injectable()
export class SauceService extends ResourcesService<Sauce> {
  constructor(injector: Injector) {
    super(injector, Resource.Sauce);
  }
}