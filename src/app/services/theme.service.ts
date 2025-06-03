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
    const initialThemes: Thématique[] = savedThemes ? JSON.parse(savedThemes) : [];
    this.themesSubject = new BehaviorSubject<Thématique[]>(initialThemes);
    this.themes$ = this.themesSubject.asObservable();
  }

  getThemes(): Thématique[] {
    return this.themesSubject.value;
  }

  getThemeById(id: number): Thématique | undefined {
    return this.getThemes().find(theme => theme.id === id);
  }

  addTheme(theme: Thématique): void {
    const updatedThemes = [...this.getThemes(), theme];
    this.updateThemes(updatedThemes);
  }

  deleteTheme(id: number): void {
    const updatedThemes = this.getThemes().filter(t => t.id !== id);
    this.updateThemes(updatedThemes);
  }

  private updateThemes(themes: Thématique[]): void {
    localStorage.setItem('themes', JSON.stringify(themes));
    this.themesSubject.next(themes);
  }
}
