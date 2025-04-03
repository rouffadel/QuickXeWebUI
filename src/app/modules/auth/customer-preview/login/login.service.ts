import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 baseUrl
  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl
   }

   createCustomerInLogin(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl+'CustomerOTPs', data);
  }
}
