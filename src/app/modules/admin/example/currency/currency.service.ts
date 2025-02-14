// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs'; 
// import { environment } from 'environments/environments';

// @Injectable({
//   providedIn: 'root'
// })

// export class CurrencyService {

//   baseUrl
//   tenantId
//   constructor(private http: HttpClient) { 
//     this.baseUrl = environment.apiUrl
//     this.tenantId = localStorage.getItem('loggedInUserId') || ''; // Fetch tenantId from local storage
//   }

//   getCurrenciesByTenant(tenantId: string): Observable<any[]> {
//     // return this.http.get<any[]>('${this.baseUrl}/Countries/ByTenant/${tenantId}');
//     return this.http.get<any[]>(this.baseUrl+'/Countries/ByTenant/${tenantId}');
//   }

//   // getCurrenciesByTenant(tenantId: string): Observable<any[]> {
//   //   const url = this.baseUrl+'/Countries/ByTenant/${encodeURIComponent(tenantId)}';
//   //   return this.http.get<any[]>(url);
//   // }

//   // getCurrenciesByTenant(tenantId: string): Observable<any[]> {
//   //   const encodedTenantId = encodeURIComponent(tenantId); // Properly encode tenantId
//   //   const url = this.baseUrl+'/Countries/ByTenant/${encodedTenantId}';
//   //   return this.http.get<any[]>(url);
//   // }
  
  

// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { environment } from 'environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  baseUrl: string;
  tenantId: string;

  constructor(private http: HttpClient) { 
    this.baseUrl = environment.apiUrl;
    // this.tenantId = localStorage.getItem('loggedInUserId') || ''; // Fetch tenantId from local storage

    this.tenantId = sessionStorage.getItem('loggedInUserId') || ''; // Fetch tenantId from local storage
  }

  // getCurrenciesByTenant(tenantId: string): Observable<any[]> {
  //   const url = this.baseUrl+'Countries/ByTenant/${encodeURIComponent(tenantId)}';
  //   return this.http.get<any[]>(url);
  // }

  getCurrenciesByTenant(tenantId: string): Observable<any[]> {
    const encodedTenantId = encodeURIComponent(tenantId); // Encode properly
    const url = `${this.baseUrl}Countries/ByTenant/${encodedTenantId}`;
    return this.http.get<any[]>(url);
  }


  getCurrencyByCountryId(countryId: string): Observable<any[]> {
    debugger
    const encodedCountryId = encodeURIComponent(countryId); // Encode properly
    const url = `${this.baseUrl}Countries/${encodedCountryId}`;
    return this.http.get<any[]>(url);
  }


  deleteCurrencyByCountryId(countryId: string): Observable<void> {
    const encodedCountryId = encodeURIComponent(countryId); // Encode properly
    const url = `${this.baseUrl}Countries/${encodedCountryId}`;
    return this.http.delete<void>(url);
  }
  

}
