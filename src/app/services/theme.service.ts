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
  private themesSubject: BehaviorSubject<Thématique[]> = new BehaviorSubject<Thématique[]>([
    {
      id: 1,
      nom: 'dev Web',
      description: 'Articles sur le développement frontend/backend (Angular, Spring Boot, etc.)',
      icone: '💻'
    }
  ]);

  public themes$ = this.themesSubject.asObservable();

  constructor() {}

  getThemes(): Thématique[] {
    return this.themesSubject.value;
  }

  getThemeById(id: number): Thématique | undefined {
    return this.getThemes().find(theme => theme.id === id);
  }

  addTheme(theme: Thématique): void {
    const updatedThemes = [...this.getThemes(), theme];
    this.themesSubject.next(updatedThemes);
  }

  deleteTheme(id: number): void {
    const updatedThemes = this.getThemes().filter(t => t.id !== id);
    this.themesSubject.next(updatedThemes);
  }
}
