import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
export class MesContributionsComponent {
  searchText: string = '';
  role: string = localStorage.getItem('role') || '';
  articles = [
    { titre: 'Sécurité API', auteur: 'Rabab', statut: 'En attente', date: new Date('2025-05-31') },
    { titre: 'Système RH', auteur: 'Laila', statut: 'À corriger', date: new Date('2025-05-30') },
    { titre: 'Angular Moderne', auteur: 'Admin', statut: 'Publié', date: new Date('2025-05-29') }
  ];

  get filteredArticles() {
    return this.articles.filter(article =>
      article.titre.toLowerCase().includes(this.searchText.toLowerCase()) ||
      article.auteur.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  exportPDF(): void {
    const doc = new jsPDF();
    const head = [['Titre', 'Statut', 'Date']];
    const data = this.filteredArticles.map(a => [
      a.titre,
      a.statut,
      new Intl.DateTimeFormat('fr-FR').format(a.date)
    ]);
    autoTable(doc, { head, body: data });
    doc.save('mes-contributions.pdf');
  }

  exportExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(
      this.filteredArticles.map(a => ({
        Titre: a.titre,
        Statut: a.statut,
        Date: new Intl.DateTimeFormat('fr-FR').format(a.date)
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Contributions');
    XLSX.writeFile(workbook, 'mes-contributions.xlsx');
  }

  changerStatut(article: any, nouveauStatut: string): void {
    article.statut = nouveauStatut;
  }
}
