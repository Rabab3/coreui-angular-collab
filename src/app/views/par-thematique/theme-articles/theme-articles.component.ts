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
  this.route.params.subscribe(params => {
    const themeId = +params['id'];
    this.articleService.getArticlesByTheme(themeId).subscribe(articles => {
      this.articles = articles;
    });
  });

  }

  toggleFavori(articleId: number): void {
    this.articleService.toggleFavori(articleId);
    this.articleService.getArticlesByTheme(this.themeId).subscribe(data => {
  this.articles = data;
});

  }

  lireArticle(id: number) {
    this.router.navigate(['/articles/details', id]);
  }
}
