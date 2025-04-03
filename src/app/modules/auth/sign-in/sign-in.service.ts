import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { environment } from 'environments/environments';

@Injectable({
  providedIn: 'root'
})

export class SignInService {

  baseUrl
  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl
   }
}
