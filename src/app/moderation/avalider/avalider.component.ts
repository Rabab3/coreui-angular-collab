import { Component, OnInit } from '@angular/core';
import { Article, ArticleService } from 'src/app/services/article.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-avalider',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './avalider.component.html',
  styleUrls: ['./avalider.component.scss']
})
export class AvaliderComponent implements OnInit {
  articles: Article[] = [];
  searchTerm = '';
  selectedArticle?: Article;
  commentaireRetour: string = '';
  showModal = false;
  showApercu = false;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.refreshArticles();
  }

  openRetourModal(article: Article) {
    this.selectedArticle = article;
    this.commentaireRetour = '';
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedArticle = undefined;
    this.commentaireRetour = '';
  }

  valider(article: Article) {
    this.articleService.updateArticle(article.id, { statut: 'VALIDE' }).subscribe(() => {
      alert(`✅ Article "${article.titre}" validé.`);
      this.refreshArticles();
    });
  }

  retourner() {
    if (this.selectedArticle && this.commentaireRetour.trim()) {
      this.articleService.updateArticle(this.selectedArticle.id, {
        statut: 'A_CORRIGER',
        retourCommentaire: this.commentaireRetour,
        dateRetour: new Date().toISOString()
      }).subscribe(() => {
        alert(`🔁 Article "${this.selectedArticle!.titre}" retourné.`);
        this.closeModal();
        this.refreshArticles();
      });
    }
  }

  voir(article: Article) {
    this.selectedArticle = article;
    this.showApercu = true;
  }

  fermerApercu() {
    this.showApercu = false;
    this.selectedArticle = undefined;
  }


  refreshArticles() {
    this.articleService.getArticlesParStatut('EN_ATTENTE').subscribe(data => {
      this.articles = data;
    });
  }


  get articlesFiltres(): Article[] {
    return this.articles.filter(a =>
        a.titre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        a.contenu.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  hasTags(): boolean {
    return !!this.selectedArticle?.tags && this.selectedArticle.tags.length > 0;
  }

  formatContenu(contenu: string): string {
    return contenu?.replace(/\n/g, '<br>') || '';
  }

  nettoyerContenu(html: string, limit: number = 150): string {
    const texte = html.replace(/<[^>]+>/g, '');
    return texte.length > limit ? texte.substring(0, limit) + '...' : texte;
  }
}
