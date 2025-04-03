import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { environment } from 'environments/environments';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  
  baseUrl
  constructor(private http: HttpClient) { 
    this.baseUrl = environment.apiUrl
  }

    // Example GET method
    getData(): Observable<any> {
      return this.http.get<any>(this.baseUrl+'Registration/registereduser')
    }

    getEmailCodeByEmail(email: string): Observable<any[]> {
      const encodedEmailId = encodeURIComponent(email); // Encode properly
      const url = `${this.baseUrl}Registration/ByUser/${encodedEmailId}`;
      return this.http.get<any[]>(url);
    }
    
}


// export class ExampleService {

//   constructor(private http: HttpClient) { }

//   // Example GET method
//   getData(): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/Countries`);
//   }



// }
