import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/utilisateurs'; // Mets l'URL de ton backend

  constructor(private http: HttpClient) {}

  // Méthode pour mettre à jour le rôle d'un utilisateur
  updateUserRole(userId: number, role: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${userId}/role`, { role });
    // Adapter selon l'API backend (PATCH ou PUT ou POST selon ce que fait le back)
  }
}
