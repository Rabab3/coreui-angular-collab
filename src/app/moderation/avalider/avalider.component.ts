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

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.getArticles().subscribe(data => {
      this.articles = data.filter(a => a.statut === 'En attente');
    });
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
    this.articleService.updateArticle(article.id, { statut: 'Publié' });
    alert(`✅ Article "${article.titre}" validé.`);
  }

  retourner() {
  if (this.selectedArticle && this.commentaireRetour.trim()) {
    this.articleService.updateArticle(this.selectedArticle.id, {
      statut: 'À corriger',
      retourCommentaire: this.commentaireRetour
    });
    alert(`🔁 Article "${this.selectedArticle.titre}" retourné.`);
    this.closeModal();
    this.refreshArticles(); // recharge la liste
  }
}
refreshArticles() {
  this.articleService.getArticles().subscribe(data => {
    this.articles = data.filter(a => a.statut?.toLowerCase() === 'en attente');
  });
}


  voir(article: Article) {
    alert(`📰 Aperçu de l'article :\n\n${article.contenu}`);
  }

  get articlesFiltres(): Article[] {
    return this.articles.filter(a =>
      a.titre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      a.contenu.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
