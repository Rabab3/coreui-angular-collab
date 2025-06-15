import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Article, ArticleService } from 'src/app/services/article.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-acorriger',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './acorriger.component.html',
  styleUrls: ['./acorriger.component.scss']
})
export class AcorrigerComponent implements OnInit {
  articles: Article[] = [];
  searchTerm: string = '';
  selectedArticle?: Article;
  showModal = false;
  role: string = localStorage.getItem('role') || '';

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.refreshArticles();
  }

  refreshArticles() {
    this.articleService.getArticles().subscribe(data => {
      this.articles = data.filter(a => a.statut === 'À corriger');
    });
  }

  get articlesFiltres(): Article[] {
    return this.articles.filter(a =>
      a.titre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (a.retourCommentaire?.toLowerCase().includes(this.searchTerm.toLowerCase()) ?? false)
    );
  }

  voirContenu(article: Article) {
    this.selectedArticle = article;
    this.showModal = true;
  }

  fermerApercu() {
    this.selectedArticle = undefined;
    this.showModal = false;
  }

  corrigerEtRenvoyer() {
    if (this.selectedArticle) {
      this.articleService.updateArticle(this.selectedArticle.id, {
        statut: 'En attente',
        retourCommentaire: undefined,
        dateRetour: undefined
      });
      alert(`✏️ Article "${this.selectedArticle.titre}" renvoyé pour validation.`);
      this.fermerApercu();
      this.refreshArticles();
    }
  }
get contenuFormate(): string {
  return this.selectedArticle?.contenu?.replace(/\n/g, '<br>') || '';
}
formatContenu(contenu: string | undefined): string {
  return contenu ? contenu.replace(/\n/g, '<br>') : '';
}

  hasTags(): boolean {
    return !!this.selectedArticle?.tags?.length;
  }
}
