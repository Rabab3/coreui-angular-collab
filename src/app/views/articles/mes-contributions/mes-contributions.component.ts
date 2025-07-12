import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArticleService, Article } from 'src/app/services/article.service';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-mes-contributions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mes-contributions.component.html',
  styleUrls: ['./mes-contributions.component.scss']
})
export class MesContributionsComponent implements OnInit {
  searchText: string = '';
  role: string = localStorage.getItem('role') || '';
  articles: Article[] = [];

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.getArticles().subscribe({
      next: (data) => {
        console.log("📦 Articles reçus du backend :", data);  // ✅ Ajouté pour debug
        this.articles = data;
      },
      error: (err) => {
        console.error('❌ Erreur lors du chargement des articles', err);
      }
    });
  }


  get filteredArticles() {
    return this.articles.filter(article =>
        article.titre.toLowerCase().includes(this.searchText.toLowerCase()) ||
        (article.source?.toLowerCase().includes(this.searchText.toLowerCase()) ?? false)
    );
  }

  exportPDF(): void {
    const doc = new jsPDF();
    const head = [['Titre', 'Statut', 'Date']];
    const data = this.filteredArticles.map(a => [
      a.titre,
      this.getStatutLabel(a.statut),
      new Intl.DateTimeFormat('fr-FR').format(new Date(a.date))
    ]);
    autoTable(doc, { head, body: data });
    doc.save('mes-contributions.pdf');
  }

  exportExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(
        this.filteredArticles.map(a => ({
          Titre: a.titre,
          Statut: this.getStatutLabel(a.statut),
          Date: new Intl.DateTimeFormat('fr-FR').format(new Date(a.date))
        }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Contributions');
    XLSX.writeFile(workbook, 'mes-contributions.xlsx');
  }

  changerStatut(article: Article, nouveauStatut: 'EN_ATTENTE' | 'VALIDE' | 'A_CORRIGER' | 'BROUILLON'): void {
    article.statut = nouveauStatut;
  }

  getStatutLabel(statut: string | undefined): string {
    switch (statut) {
      case 'EN_ATTENTE': return 'En attente';
      case 'VALIDE': return 'Publié';
      case 'A_CORRIGER': return 'À corriger';
      case 'BROUILLON': return 'Brouillon';
      default: return statut || '';
    }
  }
}
