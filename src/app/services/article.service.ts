import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { of } from 'rxjs';

export interface Article {
  id: number;
  titre: string;
  contenu: string;
  themeId: number;
  auteur?: string;
  favori?: boolean;
  date?: string;
  statut?: string;
  retourCommentaire?: string;
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
      // ✅ Article temporaire pour test de validation
      this.articles = [
        {
          id: 1,
          titre: 'Article Test à valider',
          contenu: 'Ceci est un article simulé à valider.',
          themeId: 1,
          auteur: 'Testeur',
          statut: 'En attente',
          date: new Date().toISOString().split('T')[0],
          favori: false
        }
      ];
      this.saveArticles();
    }

    this.articles$.next(this.articles);
  }

  private saveArticles() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.articles));
  }

  // 🔁 observable global
  getArticles(): Observable<Article[]> {
    return this.articles$.asObservable();
  }

  getArticlesByTheme(themeId: number): Observable<Article[]> {
  const filtered = this.articles.filter(article => article.themeId === themeId);
  return of(filtered);
}


  getArticleById(id: number): Observable<Article | undefined> {
  const article = this.articles.find(a => a.id === id);
  return of(article);
}


  addArticle(article: Article) {
    article.id = this.articles.length + 1;
    article.date = new Date().toISOString().split('T')[0];
    article.favori = false;
    article.statut = 'En attente';
    this.articles.push(article);
    this.saveArticles();
    this.articles$.next(this.articles);
  }

  updateArticle(id: number, updatedFields: Partial<Article>) {
    const index = this.articles.findIndex(a => a.id === id);
    if (index !== -1) {
      this.articles[index] = { ...this.articles[index], ...updatedFields };
      this.saveArticles();
      this.articles$.next(this.articles);
    }
  }

  // ⭐ Favoris
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
