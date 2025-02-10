import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})

export class SignInService {

  private apiUrl = 'https://localhost:7034/api/Registration/login'; 

  private registerApiUrl = 'https://localhost:7034/api/Registration/register'; 

  constructor(private http: HttpClient) { }
}
 


// export class ExampleService {

//   // private apiUrl = 'http://localhost:5000/api'; // Update with your API endpoint

//   constructor() { }

//   // Example GET method
//   getData(): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/Countries`);
//   }

// }
