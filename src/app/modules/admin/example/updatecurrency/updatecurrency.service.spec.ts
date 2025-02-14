import { TestBed } from '@angular/core/testing';

import { UpdatecurrencyService } from './updatecurrency.service';

describe('UpdatecurrencyService', () => {
  let service: UpdatecurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdatecurrencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
