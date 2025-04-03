import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OtpService {
  private phoneNumberForSignup: string = '';
  private phoneNumber: string = '';

  setOtp(phoneNumberForSignup: string) {
    debugger
    this.phoneNumberForSignup = phoneNumberForSignup;
  }

  getOtp(): string {
    debugger
    return this.phoneNumberForSignup;
  }

  setPhoneNumber(phoneNumber: string) {
    debugger
    this.phoneNumber = phoneNumber;
  }

  getPhoneNumber(): string {
    debugger
    return this.phoneNumber;
  }
}
