import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Article {
  id: number;
  titre: string;
  contenu: string;
  themeId: number;
  favori?: boolean;
  date?: string;
}

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private storageKey = 'articles_local';
  private favorisKey = 'favoris_articles';
  private articles: Article[] = [];

  private articles$ = new BehaviorSubject<Article[]>([]);

  constructor() {
    this.loadArticles();
  }

  private loadArticles() {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      this.articles = JSON.parse(data);
    } else {
      // Données par défaut si vide
      this.articles = [
        {
          id: 1,
          titre: 'Introduction à la cybersécurité',
          contenu: 'Contenu de cybersécurité...',
          themeId: 1,
          favori: false,
          date: '2025-06-01'
        },
        {
          id: 2,
          titre: 'Bonnes pratiques RH',
          contenu: 'Contenu RH...',
          themeId: 2,
          favori: false,
          date: '2025-06-02'
        }
      ];
      this.saveArticles();
    }
    this.articles$.next(this.articles);
  }

  private saveArticles() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.articles));
  }

  getArticles() {
    return this.articles$.asObservable();
  }

  getArticlesByTheme(themeId: number): Article[] {
    return this.articles.filter(article => article.themeId === themeId);
  }

  getArticleById(id: number): Article | undefined {
    return this.articles.find(article => article.id === id);
  }

  addArticle(article: Article) {
    article.id = this.articles.length + 1;
    article.date = new Date().toISOString().split('T')[0];
    article.favori = false;
    this.articles.push(article);
    this.saveArticles();
    this.articles$.next(this.articles);
  }

  // ✅ FAVORIS en localStorage
  toggleFavori(articleId: number): void {
    let favoris = this.getFavorisIds();
    if (favoris.includes(articleId)) {
      favoris = favoris.filter(id => id !== articleId);
    } else {
      favoris.push(articleId);
    }
    localStorage.setItem(this.favorisKey, JSON.stringify(favoris));
  }

  isFavori(articleId: number): boolean {
    const favoris = this.getFavorisIds();
    return favoris.includes(articleId);
  }

  getFavoris(): Article[] {
    const favorisIds = this.getFavorisIds();
    return this.articles.filter(article => favorisIds.includes(article.id));
  }

  private getFavorisIds(): number[] {
    const data = localStorage.getItem(this.favorisKey);
    return data ? JSON.parse(data) : [];
  }
}
