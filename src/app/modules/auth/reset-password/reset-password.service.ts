import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  baseUrl: string;
  username: string;

  constructor(private http: HttpClient) { 
    this.baseUrl = environment.apiUrl;

  }


  // getCurrenciesByTenant(tenantId: string): Observable<any[]> {
  //   const encodedTenantId = encodeURIComponent(tenantId); // Encode properly
  //   const url = `${this.baseUrl}Countries/ByTenant/${encodedTenantId}`;
  //   return this.http.get<any[]>(url);
  // }


  getUserNameFromEmailCode(emailcode: string): Observable<any> {
    const encodedEmailCode = encodeURIComponent(emailcode);
    const url = `${this.baseUrl}SendEmails/GetUserName/${encodedEmailCode}`;
    return this.http.get<any>(url);
  }

  resetPassword(changepassword: any): Observable<any> {
    return this.http.post<any>(this.baseUrl+'Registration/resetpassword', changepassword);
  }

  changeIsActiveToActive(username: string, data: any): Observable<any> {
    const url = `${this.baseUrl}Registration/updateisactive/${encodeURIComponent(username)}`;
    return this.http.put<any>(url, data);
  }

}
