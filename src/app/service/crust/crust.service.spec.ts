import { TestBed } from '@angular/core/testing';

import { CrustService } from './crust.service';

describe('CrustService', () => {
  let service: CrustService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrustService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
