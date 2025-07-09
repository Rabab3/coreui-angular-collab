import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export const API_BASE_URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(sessionStorage.getItem('token'));
  private roleSubject = new BehaviorSubject<string | null>(sessionStorage.getItem('role'));

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${API_BASE_URL}/auth/login`, credentials).pipe(
        tap(res => {
          console.log("✅ Login réussi : ", res);
          sessionStorage.setItem('token', res.accessToken);
          sessionStorage.setItem('role', res.role);
          this.tokenSubject.next(res.accessToken);
          this.roleSubject.next(res.role);
        })
    );
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    this.tokenSubject.next(null);
    this.roleSubject.next(null);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  getRole(): string | null {
    return this.roleSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.tokenSubject.value;
  }

  getTokenObservable(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  getRoleObservable(): Observable<string | null> {
    return this.roleSubject.asObservable();
  }
}
