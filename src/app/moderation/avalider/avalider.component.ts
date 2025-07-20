import { Component, OnInit } from '@angular/core';
import { Article, ArticleService } from 'src/app/services/article.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-avalider',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './avalider.component.html',
  styleUrls: ['./avalider.component.scss']
})
export class AvaliderComponent implements OnInit {
  articles: Article[] = [];
  selectedArticle?: Article;
  commentaireRetour: string = '';
  showRetourModal = false;
  showApercu = false;
  searchText = '';

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  get filteredArticles(): Article[] {
    return this.articles.filter(a =>
        a.titre.toLowerCase().includes(this.searchText.toLowerCase()) ||
        a.auteur?.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  loadArticles(): void {
    this.articleService.getArticlesParStatut('EN_ATTENTE').subscribe(data => {
      this.articles = data;
    });
  }

  afficherStatut(statut: string): string {
    switch (statut) {
      case 'EN_ATTENTE': return 'En attente';
      case 'A_CORRIGER': return 'À corriger';
      case 'VALIDE': return 'Publié';
      default: return 'Inconnu';
    }
  }

  getBadgeClass(statut: string): string {
    return {
      'EN_ATTENTE': 'badge-warning',
      'A_CORRIGER': 'badge-danger',
      'VALIDE': 'badge-success'
    }[statut] || 'badge-secondary';
  }

  valider(article: Article): void {
    this.articleService.validerArticle(article.articleId).subscribe(() => {
      this.loadArticles();
    });
  }

  openRetourModal(article: Article): void {
    this.selectedArticle = article;
    this.commentaireRetour = '';
    this.showRetourModal = true;
  }

  retourner(): void {
    if (this.selectedArticle && this.commentaireRetour.trim()) {
      this.articleService.retournerArticle(this.selectedArticle.articleId, this.commentaireRetour).subscribe(() => {
        this.showRetourModal = false;
        this.loadArticles();
      });
    }
  }

  voir(article: Article): void {
    this.selectedArticle = article;
    this.showApercu = true;
  }

  fermerApercu(): void {
    this.showApercu = false;
    this.selectedArticle = undefined;
  }

  exportPDF(): void {
    const doc = new jsPDF();
    const head = [['Titre', 'Auteur', 'Statut', 'Date']];
    const data = this.filteredArticles.map(a => [
      a.titre ?? '',
      a.auteur ?? '',
      this.afficherStatut(a.status ?? ''),
      new Intl.DateTimeFormat('fr-FR').format(new Date(a.date ?? ''))
    ]);
    autoTable(doc, { head, body: data });
    doc.save('articles-a-valider.pdf');
  }

  exportExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(
        this.filteredArticles.map(a => ({
          Titre: a.titre ?? '',
          Auteur: a.auteur ?? '',
          Statut: this.afficherStatut(a.status ?? ''),
          Date: new Intl.DateTimeFormat('fr-FR').format(new Date(a.date ?? ''))
        }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Articles');
    XLSX.writeFile(workbook, 'articles-a-valider.xlsx');
  }
}
