import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { environment } from 'environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UpdatecurrencyService {

  baseUrl: string;

  constructor(private http: HttpClient) { 
    this.baseUrl = environment.apiUrl;
  }

  // Fetch currency data by country ID
  getCurrencyByCountryId(countryId: string): Observable<any> {
    const url = `${this.baseUrl}Countries/${encodeURIComponent(countryId)}`;
    return this.http.get<any>(url);
  }

  updateCurrency(countryId: string, currencyData: any): Observable<any> {
    const url = `${this.baseUrl}Countries/${encodeURIComponent(countryId)}`;
    return this.http.put<any>(url, currencyData);
  }  
}
