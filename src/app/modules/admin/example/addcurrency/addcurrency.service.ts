import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { environment } from 'environments/environments';

@Injectable({
  providedIn: 'root'
})


export class AddcurrencyService {

  baseUrl
  constructor(private http: HttpClient) { 
    this.baseUrl = environment.apiUrl
  }

  // // Example GET method
  // getData(): Observable<any> {
  //   return this.http.get<any>(this.baseUrl+'Countries');
  // }

  createCurrency(currencyData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl+'Countries', currencyData);
  }

  // getCurrenciesByTenant(tenantId: string): Observable<any[]> {
  //   return this.http.get<any[]>('${this.baseUrl}/Countries/ByTenant/${tenantId}');
  // }

}
