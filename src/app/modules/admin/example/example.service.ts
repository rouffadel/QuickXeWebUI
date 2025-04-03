import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { environment } from 'environments/environments';

@Injectable({
  providedIn: 'root'
})

export class ExampleService {
 
  baseUrl
  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl
   }

  // Example GET method
  getData(): Observable<any> {
    return this.http.get<any>(this.baseUrl+'Countries')
  }

}
