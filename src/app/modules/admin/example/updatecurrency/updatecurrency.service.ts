// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs'; 
// import { environment } from 'environments/environments';

// @Injectable({
//   providedIn: 'root'
// })


// export class UpdatecurrencyService {

//   baseUrl
//   constructor(private http: HttpClient) { 
//     this.baseUrl = environment.apiUrl
//   }


//   getCurrencyByCountryId(countryId: string): Observable<any[]> {
//     const encodedCountryId = encodeURIComponent(countryId); // Encode properly
//     const url = `${this.baseUrl}Countries/${encodedCountryId}`;
//     return this.http.get<any[]>(url);
//   }

// }




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

  // Update currency details
  // updateCurrency(currencyData: any): Observable<any> {
  //   const url = `${this.baseUrl}Countries/${encodeURIComponent(countryId)}`; // Adjust URL based on API
  //   return this.http.put<any>(url, currencyData);
  // }

  updateCurrency(countryId: string, currencyData: any): Observable<any> {
    const url = `${this.baseUrl}Countries/${encodeURIComponent(countryId)}`;
    return this.http.put<any>(url, currencyData);
  }
  

  // putCustomer(currencyData: any) {
  //   this.http.put<any>(this.baseUrl+ "Countries/" + this.country.customerId, this.customer)
  //     .subscribe(
  //       res => { },);
  // }
  
}
