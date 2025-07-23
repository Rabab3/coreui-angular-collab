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
  username: string = ''; // ✅ Ajouté
  searchTerm: string = '';

  constructor(
      private route: ActivatedRoute,
      private themeService: ThemeService,
      private articleService: ArticleService,
      private router: Router
  ) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role') || 'lecteur';
    this.username = localStorage.getItem('username') || 'contributor'; // ✅ récupération dynamique

    this.route.params.subscribe(params => {
      this.themeId = +params['id'];
      this.theme = this.themeService.getThemeById(this.themeId);

      this.articleService.getArticlesByTheme(this.themeId).subscribe(articles => {
        this.allArticles = articles.filter(a => a.status === 'VALIDE');
        this.articles = [...this.allArticles];
      });
    });
  }

  toggleFavori(articleId: number): void {
    this.articleService.toggleFavori(articleId, this.username).subscribe(() => {
      // ✅ Rafraîchir uniquement les favoris si besoin ou mettre à jour l’état local
      this.articleService.getArticlesByTheme(this.themeId).subscribe(data => {
        this.allArticles = data.filter(a => a.status === 'VALIDE');
        this.filtrerArticles(); // ✅ Conserver le filtre si actif
      });
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
