import { TestBed } from '@angular/core/testing';

import { HttpCoreService } from './http-core.service';

describe('HttpCoreService', () => {
  let service: HttpCoreService<null>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
