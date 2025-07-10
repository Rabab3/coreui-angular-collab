import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

export const API_BASE_URL = 'http://localhost:8080/api';

export interface UserDto {
    id?: number;
    nom: string;
    prenom: string;
    email?: string;
    telephone?: string;
    dateNaissance?: string;
    cin?: string;
    username: string;
    roles: string[];
}

@Injectable({
    providedIn: 'root'
})
export class UtilisateurService {
    private apiUrl = `${API_BASE_URL}/users`;

    constructor(private http: HttpClient, private authService: AuthService) {}

    private getHeaders(): HttpHeaders {
        const token = this.authService.getToken();
        return new HttpHeaders({
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
    }

    getAllUsers(): Observable<UserDto[]> {
        return this.http.get<UserDto[]>(this.apiUrl, { headers: this.getHeaders() });
    }

    createUser(userDto: UserDto, password: string): Observable<UserDto> {
        const params = new HttpParams().set('password', password);
        return this.http.post<UserDto>(this.apiUrl, userDto, {
            headers: this.getHeaders(),
            params
        });
    }

    updateUser(id: number, userDto: UserDto): Observable<UserDto> {
        return this.http.put<UserDto>(`${this.apiUrl}/${id}`, userDto, {
            headers: this.getHeaders()
        });
    }

    updatePassword(id: number, newPassword: string): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}/password`, `"${newPassword}"`, {
            headers: this.getHeaders(),
            responseType: 'text' as 'json'
        });
    }

    updateUserRole(userId: number, role: string): Observable<any> {
        return this.http.patch(`${API_BASE_URL}/users/${userId}/role`, role, {

            headers: this.getHeaders(),
            responseType: 'text' as 'json'
        });
    }


    deleteUser(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`, {
            headers: this.getHeaders()
        });
    }
}
