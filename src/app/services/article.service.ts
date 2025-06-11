import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface Article {
  id: number;
  titre: string;
  contenu: string;
  themeId: number;
  date: string;
  favori?: boolean;
  statut?: string;
  retourCommentaire?: string;
  dateRetour?: string;
  modeSaisie?: string;     // 'texte' ou 'fichier'
  categorie?: string;      // ex: "Développement Web"
  tags?: string[];         // liste de hashtags
  source?: string;         // lien facultatif
}

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private articlesSubject: BehaviorSubject<Article[]>;

  constructor() {
    const savedArticles = localStorage.getItem('articles');
    const initialArticles: Article[] = savedArticles ? JSON.parse(savedArticles) : [
      {
        id: 1,
        titre: "Créer une authentification sécurisée avec JWT dans Angular et Spring Boot",
        contenu: `Dans cet article, nous allons apprendre à mettre en place une authentification sécurisée basée sur JWT (JSON Web Token) en utilisant Angular pour le frontend et Spring Boot pour le backend.

Étapes principales :
- Création des endpoints d'authentification (login/register) dans Spring Boot
- Génération et validation des tokens JWT côté backend
- Intégration du service d’authentification dans Angular
- Intercepteur HTTP pour ajouter automatiquement le token
- Redirection conditionnelle selon les rôles (admin, utilisateur…)

Ce guide vous permettra de construire une base solide pour vos applications sécurisées.`,
        themeId: 1,
        date: "2025-06-11",
        favori: false,
        statut: "Publié",
        modeSaisie: "texte",
        categorie: "dev Web",
        tags: ["#angular", "#springboot", "#jwt", "#authentification", "#sécurité"],
        source: "https://jwt.io/introduction"
      }
    ];
    this.articlesSubject = new BehaviorSubject<Article[]>(initialArticles);
    this.saveToLocalStorage(initialArticles);
  }

  private saveToLocalStorage(data: Article[]) {
    localStorage.setItem('articles', JSON.stringify(data));
    this.articlesSubject.next(data);
  }

  getArticles(): Observable<Article[]> {
    return this.articlesSubject.asObservable();
  }

  getArticlesByTheme(themeId: number): Observable<Article[]> {
    const all = this.articlesSubject.value;
    const filtered = all.filter(a => a.themeId === themeId);
    return of(filtered);
  }

  getArticleById(id: number): Observable<Article | undefined> {
    const article = this.articlesSubject.value.find(a => a.id === id);
    return of(article);
  }

  toggleFavori(articleId: number): void {
    const articles = this.articlesSubject.value.map(a =>
      a.id === articleId ? { ...a, favori: !a.favori } : a
    );
    this.saveToLocalStorage(articles);
  }

  addArticle(article: Article): void {
    const articles = [...this.articlesSubject.value, article];
    this.saveToLocalStorage(articles);
  }

  updateArticle(id: number, updates: Partial<Article>): void {
    const articles = this.articlesSubject.value.map(a =>
      a.id === id ? { ...a, ...updates } : a
    );
    this.saveToLocalStorage(articles);
  }
}
