import { TestBed } from '@angular/core/testing';

import { VerifyLoginOtpService } from './verify-login-otp.service';

describe('VerifyLoginOtpService', () => {
  let service: VerifyLoginOtpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyLoginOtpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
