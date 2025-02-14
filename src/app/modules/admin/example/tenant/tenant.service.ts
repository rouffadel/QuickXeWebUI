import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { environment } from 'environments/environments';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  // private apiUrl = 'https://localhost:7034/api';

  // https://localhost:7034/api/Registration/registered_user
  
  baseUrl
  constructor(private http: HttpClient) { 
    this.baseUrl = environment.apiUrl
  }

    // Example GET method
    getData(): Observable<any> {
      return this.http.get<any>(this.baseUrl+'Registration/registered_user')
    }

      // // Example POST method
  // postData(data: any): Observable<any> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.post<any>(`${this.apiUrl}/https://localhost:7034/api/Countries`, data, { headers });
  // }
}


// export class ExampleService {

//   constructor(private http: HttpClient) { }

//   // Example GET method
//   getData(): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/Countries`);
//   }



// }
