import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { environment } from 'environments/environments';

@Injectable({
  providedIn: 'root'
})


export class ChangepasswordService {
  baseUrl: string;
  username: string;

  constructor(private http: HttpClient) { 
    this.baseUrl = environment.apiUrl;

  }


  changePassword(changepassword: any): Observable<any> {
    return this.http.post<any>(this.baseUrl+'Registration/resetpassword', changepassword);
  }

}
