import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { changepasswordResolver } from './changepassword.resolver';

describe('changepasswordResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => changepasswordResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
