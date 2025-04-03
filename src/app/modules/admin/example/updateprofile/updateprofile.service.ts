import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { environment } from 'environments/environments';

@Injectable({
  providedIn: 'root'
})


export class UpdateprofileService {

  baseUrl: string;

  constructor(private http: HttpClient) { 
    this.baseUrl = environment.apiUrl;
  }

  getUserById(Id: string): Observable<any> {
    const url = `${this.baseUrl}Registration/${encodeURIComponent(Id)}`;
    return this.http.get<any>(url);
  }

  updateUserDetails(Id: string, userdata: any): Observable<any> {
    const url = `${this.baseUrl}Registration/updateuser/${encodeURIComponent(Id)}`;
    return this.http.put<any>(url, userdata);
  } 

}
