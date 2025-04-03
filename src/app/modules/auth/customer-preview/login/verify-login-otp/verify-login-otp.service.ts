import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerifyLoginOtpService {
  baseUrl
  constructor(private http: HttpClient) { 
    this.baseUrl = environment.apiUrl
  }


  // sendPhoneNumberWithOTP(data: any): Observable<any> {
  //   return this.http.post<any>(this.baseUrl+'CustomerOTPs/validate-login-otp', data);
  // }


  

  // getEmailCodeByEmail(email: string): Observable<any[]> {
  //   const encodedEmailId = encodeURIComponent(email); // Encode properly
  //   const url = `${this.baseUrl}Registration/ByUser/${encodedEmailId}`;
  //   return this.http.get<any[]>(url);
  // }


}
