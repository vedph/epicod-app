import { TestBed } from '@angular/core/testing';

import { EpicodApiService } from './epicod-api.service';

describe('EpicodApiService', () => {
  let service: EpicodApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpicodApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
