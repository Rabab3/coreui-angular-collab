import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, Thématique } from 'src/app/services/theme.service';

@Component({
  selector: 'app-theme-manage',
  standalone: true,
  templateUrl: './theme-manage.component.html',
  styleUrls: ['./theme-manage.component.scss'],
  imports: [CommonModule]
})
export class ThemeManageComponent implements OnInit {
  themes: Thématique[] = [];

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themes = this.themeService.getThemes();
  }

  supprimerTheme(id: number) {
    this.themeService.deleteTheme(id);
    this.themes = this.themeService.getThemes();
  }
}
