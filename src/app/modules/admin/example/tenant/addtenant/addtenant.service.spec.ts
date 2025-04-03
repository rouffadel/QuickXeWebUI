import { TestBed } from '@angular/core/testing';

import { AddtenantService } from './addtenant.service';

describe('AddtenantService', () => {
  let service: AddtenantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddtenantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
