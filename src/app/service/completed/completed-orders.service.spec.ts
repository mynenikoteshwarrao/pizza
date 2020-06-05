import { TestBed } from '@angular/core/testing';

import { CompletedOrdersService } from './completed-orders.service';

describe('CompletedOrdersService', () => {
  let service: CompletedOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompletedOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
