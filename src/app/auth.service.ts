  import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from './app.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${API_BASE_URL}/auth/login`, credentials);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${API_BASE_URL}/auth/register`, data);
  }
}
