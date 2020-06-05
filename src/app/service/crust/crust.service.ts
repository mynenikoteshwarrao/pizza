import { Injectable, Injector } from '@angular/core';
import { ResourcesService } from 'src/app/core/resources-service/resources.service';
import { Crust } from 'src/app/models/crust-model';
import { Resource } from 'src/app/enums/resource.enum';

@Injectable()
export class CrustService extends ResourcesService<Crust> {
  constructor(injector: Injector) {
    super(injector, Resource.Crust);
  }
}
