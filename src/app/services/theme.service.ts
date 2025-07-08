import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Thématique {
  id: number;
  nom: string;
  description: string;
  icone?: string;
  code?: string; // utilisé pour les routes fixes
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themesSubject: BehaviorSubject<Thématique[]>;
  public themes$;

  private readonly fixedThemes: Thématique[] = [
    {
      id: 1,
      nom: 'Métiers',
      description: 'Métiers du numérique 👔',
      icone: '📌',
      code: 'metier'
    },
    {
      id: 2,
      nom: 'Technique',
      description: 'Développement et technologies ⚙️',
      icone: '⚙️',
      code: 'technique'
    },
    {
      id: 3,
      nom: 'Sécurité',
      description: 'Cybersécurité et bonnes pratiques 🔐',
      icone: '🔐',
      code: 'securite'
    },
    {
      id: 4,
      nom: 'RH',
      description: 'Ressources humaines et soft skills 👥',
      icone: '👥',
      code: 'rh'
    }
  ];

  constructor() {
    const savedThemes = localStorage.getItem('themes');
    const dynamicThemes: Thématique[] = savedThemes ? JSON.parse(savedThemes) : [];

    // Fusion fixe + dynamique sans doublons de `id` ni `code`
    const mergedThemes = [
      ...this.fixedThemes,
      ...dynamicThemes.filter(
        dyn => !this.fixedThemes.some(
          fix => fix.id === dyn.id || fix.code?.toLowerCase() === dyn.code?.toLowerCase()
        )
      )
    ];

    this.themesSubject = new BehaviorSubject<Thématique[]>(mergedThemes);
    this.themes$ = this.themesSubject.asObservable();
    this.saveToLocalStorage(dynamicThemes);
  }

  private saveToLocalStorage(themes: Thématique[]): void {
    const fixedCodes = ['metier', 'technique', 'securite', 'rh'];
    const dynamicOnly = themes.filter(t => !fixedCodes.includes(t.code || ''));
    localStorage.setItem('themes', JSON.stringify(dynamicOnly));
  }

  getThemes(): Thématique[] {
    return this.themesSubject.value;
  }

  getThemeById(id: number): Thématique | undefined {
    return this.getThemes().find(theme => theme.id === id);
  }

  getThemeByCode(code: string): Thématique | undefined {
    return this.getThemes().find(theme => theme.code?.toLowerCase() === code.toLowerCase());
  }

  addTheme(theme: Thématique): void {
    const currentThemes = this.getThemes();
    const updatedThemes = [...currentThemes, theme];
    this.themesSubject.next(updatedThemes);
    this.saveToLocalStorage(updatedThemes);
  }

  deleteTheme(id: number): void {
    const updatedThemes = this.getThemes().filter(t => t.id !== id);
    this.themesSubject.next(updatedThemes);
    this.saveToLocalStorage(updatedThemes);
  }
}
