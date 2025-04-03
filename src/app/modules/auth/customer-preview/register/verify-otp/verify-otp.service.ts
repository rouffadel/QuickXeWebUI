import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VerifyOtpService {
  baseUrl
  constructor(private http: HttpClient) { 
    this.baseUrl = environment.apiUrl
  }

  // sendDetailsWithOTP(data: any): Observable<any> {
  //   return this.http.post<any>(this.baseUrl+'CustomerOTPs/validate-otp', data);
  // }


  // sendPhoneNumberWithOTP(data: any): Observable<any> {
  //   return this.http.post<any>(this.baseUrl+'CustomerOTPs/validate-login-otp', data);
  // }

  validateSignUpOTP(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}CustomerOTPs/validate-otp`, data);
  }

  validateLoginOTP(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}CustomerOTPs/validate-login-otp`, data);
  }

  // sendPhoneNumberWithOTP(data: any): Observable<any> {
  //   return this.http.post<any>(this.baseUrl+'CustomerLoginOTPs/validate-otp', data);

  // }
  // getEmailCodeByEmail(email: string): Observable<any[]> {
  //   const encodedEmailId = encodeURIComponent(email); // Encode properly
  //   const url = `${this.baseUrl}Registration/ByUser/${encodedEmailId}`;
  //   return this.http.get<any[]>(url);
  // }


}