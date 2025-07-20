import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

export const API_BASE_URL = 'http://localhost:8080/api';

export interface Article {
  articleId: number;
  titre: string;
  contenu: string;
  themeId: number;
  date: string;
  favori?: boolean;
  status?: 'EN_ATTENTE' | 'VALIDE' | 'A_CORRIGER' | 'BROUILLON';
  retourCommentaire?: string;
  dateRetour?: string;
  modeSaisie?: string;
  categorie?: string;
  tags?: string[];
  source?: string;
  visibilite?: 'public' | 'brouillon';
  mode?: string;
  isDraft?: boolean;
  auteur?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private baseUrl = `${API_BASE_URL}`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}/contribute/articles`, {
      headers: this.getHeaders()
    });
  }

  addArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(`${this.baseUrl}/contribute/articles`, article, {
      headers: this.getHeaders()
    });
  }

  getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.baseUrl}/contribute/articles/${id}`, {
      headers: this.getHeaders()  
    });
  }

  updateArticleAsContributeur(id: number, updates: Partial<Article>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/contribute/articles/${id}`, updates, {
      headers: this.getHeaders()
    });
  }

  validerArticle(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/moderation/articles/${id}/valider`, {}, {
      headers: this.getHeaders()
    });
  }

  retournerArticle(id: number, message: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/moderation/articles/${id}/retourner`, { message }, {
      headers: this.getHeaders()
    });
  }

  supprimerArticle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/contribute/articles/${id}`, {
      headers: this.getHeaders()
    });
  }

  toggleFavori(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/contribute/articles/${id}/favoris`, {}, {
      headers: this.getHeaders()
    });
  }

  getArticlesByTheme(themeId: number): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}/themes/${themeId}/articles`, {
      headers: this.getHeaders()
    });
  }

  getMesArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}/contribute/articles`, {
      headers: this.getHeaders()
    });
  }

  getDrafts(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}/contribute/articles/drafts`, {
      headers: this.getHeaders()
    });
  }

  getArticlesParStatut(statut: string): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}/moderation/articles?statut=${statut}`, {
      headers: this.getHeaders()
    });
  }

  getArticlesEnAttente(): Observable<Article[]> {
    return this.getArticlesParStatut('EN_ATTENTE');
  }
}
