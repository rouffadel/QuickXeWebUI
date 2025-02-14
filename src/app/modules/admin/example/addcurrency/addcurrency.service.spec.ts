import { TestBed } from '@angular/core/testing';

import { AddcurrencyService } from './addcurrency.service';

describe('AddcurrencyService', () => {
  let service: AddcurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddcurrencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
