import { TestBed } from '@angular/core/testing';

import { ExchangecurrencyService } from './exchangecurrency.service';

describe('ExchangecurrencyService', () => {
  let service: ExchangecurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExchangecurrencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
