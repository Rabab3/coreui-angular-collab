import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService, Thématique } from 'src/app/services/theme.service';

@Component({
  selector: 'app-thematique',
  standalone: true,
  templateUrl: './thematique.component.html',
  styleUrls: ['./thematique.component.scss'],
  imports: [CommonModule]
})
export class ThematiqueComponent implements OnInit {
  themeId: number | null = null;
  theme?: Thématique;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.themeId = idParam ? +idParam : null;

    if (this.themeId !== null) {
      this.theme = this.themeService.getThemeById(this.themeId);
    }
  }

  lireArticle(id: number) {
    this.router.navigate(['/articles', id]);
  }
}