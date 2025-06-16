import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArticleService, Article } from 'src/app/services/article.service';
import { ThemeService, Thématique } from 'src/app/services/theme.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-theme-articles',
  standalone: true,
  templateUrl: './theme-articles.component.html',
  styleUrls: ['./theme-articles.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class ThemeArticlesComponent implements OnInit {
  themeId!: number;
  theme?: Thématique;
  articles: Article[] = [];
  allArticles: Article[] = [];
  role: string = '';
  searchTerm: string = '';

  constructor(
    private route: ActivatedRoute,
    private themeService: ThemeService,
    private articleService: ArticleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role') || 'lecteur';

    this.route.params.subscribe(params => {
      this.themeId = +params['id'];
      this.theme = this.themeService.getThemeById(this.themeId);

      this.articleService.getArticlesByTheme(this.themeId).subscribe(articles => {
        this.allArticles = articles.filter(a => a.statut === 'Publié');
        this.articles = [...this.allArticles];
      });
    });
  }

  toggleFavori(articleId: number): void {
    this.articleService.toggleFavori(articleId);
    this.articleService.getArticlesByTheme(this.themeId).subscribe(data => {
      this.articles = data.filter(a => a.statut === 'Publié');
    });
  }

  lireArticle(id: number) {
    this.router.navigate(['/articles/details', id]);
  }

  ajouterArticle() {
    this.router.navigate(['/articles/add']);
  }

  filtrerArticles(): void {
    const term = this.searchTerm.toLowerCase();
    this.articles = this.allArticles.filter(a =>
      a.titre.toLowerCase().includes(term)
    );
  }

  isFavori(article: Article): boolean {
    return article.favori === true;
  }

  peutAjouter(): boolean {
    return this.role === 'contributeur' || this.role === 'moderateur';
  }
}
