import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
    providedIn: 'root'
})
export class UtilisateurService {
    private apiUrl = 'http://localhost:8080/api/users';

    constructor(private http: HttpClient, private authService: AuthService) {}

    private getHeaders(): HttpHeaders {
        const token = this.authService.getToken();
        console.log("🛡️ Token envoyé :", token);  // pour tester
        return new HttpHeaders({
            Authorization: `Bearer ${token}`
        });
    }


    getAllUsers(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
    }

    createUser(userDto: any, password: string): Observable<any> {
        const params = new HttpParams().set('password', password);
        return this.http.post<any>(this.apiUrl, userDto, {
            headers: this.getHeaders(),
            params
        });
    }

    updatePassword(id: number, newPassword: string): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}/password`, newPassword, {
            headers: this.getHeaders(),
            responseType: 'text' as 'json'
        });
    }


    updateUser(id: number, userDto: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${id}`, userDto, {
            headers: this.getHeaders()
        });
    }

    deleteUser(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`, {
            headers: this.getHeaders()
        });
    }
}
