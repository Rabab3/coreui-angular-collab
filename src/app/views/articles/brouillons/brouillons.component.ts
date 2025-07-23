import { Component, OnInit } from '@angular/core';
import { ArticleService, Article } from 'src/app/services/article.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brouillons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brouillons.component.html',
  styleUrls: ['./brouillons.component.scss']
})
export class BrouillonsComponent implements OnInit {
  brouillons: Article[] = [];

  constructor(private articleService: ArticleService, private router: Router) {}

  ngOnInit(): void {
    this.articleService.getDrafts().subscribe(data => {
      this.brouillons = data;
    });
  }

  stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '');
  }

  supprimer(id: number): void {
    if (confirm('🗑️ Voulez-vous vraiment supprimer ce brouillon ?')) {
      this.articleService.supprimerArticle(id).subscribe({
        next: () => {
          this.brouillons = this.brouillons.filter(a => a.articleId !== id);
        },
        error: () => alert('❌ Échec de la suppression. Vérifiez vos permissions.')
      });
    }
  }

  publier(id: number): void {
    this.articleService.updateArticleAsContributeur(id, {
      status: 'EN_ATTENTE',
      visibilite: 'public',
      isDraft: false
    }).subscribe(() => {
      this.ngOnInit();
      this.router.navigate(['/articles/mes-contributions']);
    });
  }

  modifier(id: number): void {
    this.router.navigate(['/articles/ajouter', id]);
  }
}
