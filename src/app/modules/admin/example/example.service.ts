import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { environment } from 'environments/environments';

@Injectable({
  providedIn: 'root'
})


// export class ApiService {

//   private apiUrl = 'http://localhost:5000/api'; // Update with your API endpoint

//   constructor(private http: HttpClient) { }

//   // Example GET method
//   getData(): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/your-endpoint`);
//   }

//   // Example POST method
//   postData(data: any): Observable<any> {
//     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
//     return this.http.post<any>(`${this.apiUrl}/your-endpoint`, data, { headers });
//   }
// }

export class ExampleService {

  // private apiUrl = 'http://localhost:5000/api'; // Update with your API endpoint

  // private apiUrl = 'https://localhost:7034/api'; 
  baseUrl
  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl
   }

  // Example GET method
  getData(): Observable<any> {
    return this.http.get<any>(this.baseUrl+'Countries')
  }

  // // Example POST method
  // postData(data: any): Observable<any> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.post<any>(`${this.apiUrl}/https://localhost:7034/api/Countries`, data, { headers });
  // }

}
