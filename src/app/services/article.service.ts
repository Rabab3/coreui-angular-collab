import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export const API_BASE_URL = 'http://localhost:8080/api';

export interface Article {
  id: number;
  titre: string;
  contenu: string;
  themeId: number;
  date: string;
  favori?: boolean;
  statut?: 'EN_ATTENTE' | 'VALIDE' | 'A_CORRIGER' | 'BROUILLON';
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

  constructor(private http: HttpClient) {}

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}/contribute/articles`);
  }

  getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.baseUrl}/contribute/articles/${id}`);
  }

  addArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(`${this.baseUrl}/contribute/articles`, article);
  }

  updateArticle(id: number, updates: Partial<Article>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/contribute/articles/${id}`, updates);
  }

  supprimerArticle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/contribute/articles/${id}`);
  }

  toggleFavori(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/contribute/articles/${id}/favoris`, {});
  }

  getArticlesByTheme(themeId: number): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}/themes/${themeId}/articles`);
  }

  getMesArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}/contribute/articles`);
  }

  getDrafts(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}/contribute/articles/drafts`);
  }

  getArticlesParStatut(statut: string): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}/moderation/articles?statut=${statut}`);
  }

  getArticlesEnAttente(): Observable<Article[]> {
    return this.getArticlesParStatut('EN_ATTENTE');
  }
}
