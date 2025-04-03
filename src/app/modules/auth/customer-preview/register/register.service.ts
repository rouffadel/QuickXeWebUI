import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
 baseUrl
  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl
   }

   createCustomer(customerData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl+'Customers/register', customerData);
  }

  createCustomerOTP(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl+'CustomerOTPs', data);
  }

  // getCodeByPhoneNumber(phoneNumber: string): Observable<any> {
  //   const encodedPhoneNumber = encodeURIComponent(phoneNumber); // Encode properly
  //   const url = `${this.baseUrl}Customers/ByPhoneNumber/${encodedPhoneNumber}`;
  //   return this.http.get<any>(url);
  // }
}
