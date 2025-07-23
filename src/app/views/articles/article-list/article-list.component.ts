import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf, NgClass, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArticleService, Article } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, NgIf, NgClass, DatePipe],
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  providers: [DatePipe]
})
export class ArticleListComponent implements OnInit {
  searchText = '';
  selectedCategory = '';
  popupVisible = false;
  popupFavoriVisible = false;
  favoriArticleTitre = '';
  articleSelectionne: Article | null = null;

  categories = ['RH', 'TECHNIQUE', 'SÉCURITÉ', 'METEOR'];
  articles: Article[] = [];

  favorisIds: number[] = [];
  username = 'contributor'; // TODO: récupérer dynamiquement via AuthService

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.getArticlesPublies().subscribe((articles) => {
      this.articles = articles;
    });

    this.articleService.getFavorisIds(this.username).subscribe(ids => {
      this.favorisIds = ids;
    });
  }

  filteredArticles(): Article[] {
    return this.articles.filter(article =>
        article.status === 'VALIDE' &&
        article.titre?.toLowerCase().includes(this.searchText.toLowerCase()) &&
        (
            this.selectedCategory === '' ||
            article.categorie?.toLowerCase() === this.selectedCategory.toLowerCase()
        )
    );
  }

  stripHtml(html: string): string {
    return html ? html.replace(/<[^>]+>/g, '') : '';
  }

  estFavori(article: Article): boolean {
    return this.favorisIds.includes(article.articleId);
  }

  toggleFavori(article: Article): void {
    this.articleService.toggleFavori(article.articleId, this.username).subscribe(() => {
      if (this.estFavori(article)) {
        this.favorisIds = this.favorisIds.filter(id => id !== article.articleId);
      } else {
        this.favorisIds.push(article.articleId);
      }

      this.favoriArticleTitre = article.titre;
      this.popupFavoriVisible = true;

      setTimeout(() => {
        this.popupFavoriVisible = false;
        this.favoriArticleTitre = '';
      }, 1500);
    });
  }

  ouvrirPopup(article: Article): void {
    this.articleSelectionne = article;
    this.popupVisible = true;
    document.body.classList.add('modal-open');
  }

  fermerPopup(): void {
    this.popupVisible = false;
    this.articleSelectionne = null;
    document.body.classList.remove('modal-open');
  }
}
