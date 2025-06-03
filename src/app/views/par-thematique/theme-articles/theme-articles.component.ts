import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArticleService, Article } from 'src/app/services/article.service';
import { ThemeService, Thématique } from 'src/app/services/theme.service';

@Component({
  selector: 'app-theme-articles',
  standalone: true,
  templateUrl: './theme-articles.component.html',
  styleUrls: ['./theme-articles.component.scss'],
  imports: [CommonModule]
})
export class ThemeArticlesComponent implements OnInit {
  themeId!: number;
  theme?: Thématique;
  articles: Article[] = [];

  constructor(
    private route: ActivatedRoute,
    private themeService: ThemeService,
    private articleService: ArticleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.themeId = id;
      this.theme = this.themeService.getThemeById(this.themeId);
      this.articles = this.articleService.getArticlesByTheme(this.themeId);
    });
  }

  toggleFavori(articleId: number): void {
    this.articleService.toggleFavori(articleId);
    this.articles = this.articleService.getArticlesByTheme(this.themeId);
  }

  lireArticle(id: number) {
    this.router.navigate(['/articles/details', id]);
  }
}
