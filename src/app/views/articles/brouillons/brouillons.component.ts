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
    this.brouillons = this.articleService.getBrouillons();
  }

  stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '');
  }

  modifier(id: number): void {
    this.router.navigate(['/articles/modifier', id]);
  }

  publier(id: number): void {
    this.articleService.updateArticle(id, {
      statut: 'En attente',
      visibilite: 'public'
    });
    this.brouillons = this.articleService.getBrouillons();
    this.router.navigate(['/articles/mes-contributions']);
  }

  supprimer(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce brouillon ?')) {
      this.articleService.supprimerArticle(id);
      this.brouillons = this.articleService.getBrouillons();
    }
  }
}
