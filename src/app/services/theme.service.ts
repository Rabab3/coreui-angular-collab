import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Thématique {
  id: number;
  nom: string;
  description: string;
  icone?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themesSubject: BehaviorSubject<Thématique[]>;
  public themes$;

  constructor() {
    const savedThemes = localStorage.getItem('themes');
    let initialThemes: Thématique[] = savedThemes ? JSON.parse(savedThemes) : [];

    // Ajout d’une thématique par défaut si aucun thème
    if (initialThemes.length === 0) {
      initialThemes = [
        {
          id: 1,
          nom: 'dev Web',
          description: 'Articles sur le développement frontend/backend (Angular, Spring Boot, etc.)',
          icone: '💻'
        }
      ];
    }

    this.themesSubject = new BehaviorSubject<Thématique[]>(initialThemes);
    this.themes$ = this.themesSubject.asObservable();
    this.saveToLocalStorage(initialThemes);
  }

  private saveToLocalStorage(themes: Thématique[]): void {
    localStorage.setItem('themes', JSON.stringify(themes));
  }

  getThemes(): Thématique[] {
    return this.themesSubject.value;
  }

  getThemeById(id: number): Thématique | undefined {
    return this.getThemes().find(theme => theme.id === id);
  }

  addTheme(theme: Thématique): void {
    const updatedThemes = [...this.getThemes(), theme];
    this.themesSubject.next(updatedThemes);
    this.saveToLocalStorage(updatedThemes);
  }

  deleteTheme(id: number): void {
    const updatedThemes = this.getThemes().filter(t => t.id !== id);
    this.themesSubject.next(updatedThemes);
    this.saveToLocalStorage(updatedThemes);
  }
}
