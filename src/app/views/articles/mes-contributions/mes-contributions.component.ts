import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ArticleService, Article } from 'src/app/services/article.service';

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
  showModal = false;
  articleEnCours: Article | null = null;
  articles: Article[] = [];

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.chargerArticles();
  }

  chargerArticles(): void {
    this.articleService.getArticles().subscribe(data => {
      this.articles = data;
    });
  }

  get filteredArticles(): Article[] {
    return this.articles.filter(article =>
        article.titre.toLowerCase().includes(this.searchText.toLowerCase()) ||
        article.auteur?.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  afficherStatut(statut?: string): string {
    switch (statut) {
      case 'EN_ATTENTE': return 'En attente';
      case 'A_CORRIGER': return 'À corriger';
      case 'VALIDE': return 'Publié';
      default: return statut || 'Inconnu';
    }
  }

  exportPDF(): void {
    const doc = new jsPDF();
    const head = [['Titre', 'Statut', 'Date']];
    const data = this.filteredArticles.map(a => [
      a.titre,
      this.afficherStatut(a.status),
      new Intl.DateTimeFormat('fr-FR').format(new Date(a.date))
    ]);
    autoTable(doc, { head, body: data });
    doc.save('mes-contributions.pdf');
  }

  exportExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(
        this.filteredArticles.map(a => ({
          Titre: a.titre,
          Statut: this.afficherStatut(a.status),
          Date: new Intl.DateTimeFormat('fr-FR').format(new Date(a.date))
        }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Contributions');
    XLSX.writeFile(workbook, 'mes-contributions.xlsx');
  }

  ouvrirModal(article: Article): void {
    this.articleService.getArticleById(article.articleId).subscribe(detail => {
      this.articleEnCours = detail;
      this.showModal = true;
      console.log('✅ articleEnCours avec détail complet :', detail);
    });
  }



  envoyerCorrection(): void {
    if (this.articleEnCours) {
      const update: Partial<Article> = {
        contenu: this.articleEnCours.contenu,
        status: 'EN_ATTENTE',
        retourCommentaire: undefined,
        dateRetour: undefined
      };
      this.articleService.updateArticleAsContributeur(this.articleEnCours.articleId, update).subscribe(() => {
        this.showModal = false;
        this.articleEnCours = null;
        this.chargerArticles();
      });
    }
  }

  annuler(): void {
    this.showModal = false;
    this.articleEnCours = null;
  }
}
