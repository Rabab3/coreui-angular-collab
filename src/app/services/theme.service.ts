import { Injectable } from '@angular/core';

export interface Thématique {
  id: number;
  nom: string;
  description: string;
  icone?: string;
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private storageKey = 'themes';

  getThemes(): Thématique[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  addTheme(theme: Thématique): void {
    const themes = this.getThemes();
    themes.push(theme);
    localStorage.setItem(this.storageKey, JSON.stringify(themes));
  }

  deleteTheme(id: number): void {
    const themes = this.getThemes().filter(t => t.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(themes));
  }

  getThemeById(id: number): Thématique | undefined {
    return this.getThemes().find(t => t.id === id);
  }
} 