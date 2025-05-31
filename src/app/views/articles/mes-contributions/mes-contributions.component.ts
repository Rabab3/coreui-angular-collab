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
  searchText = '';
  selectedAuteur = '';
  selectedStatut = '';
  currentPage = 1;
  itemsPerPage = 5;
  role = 'ADMIN';

  articles = [
    { titre: 'Article 1', auteur: 'Laila', statut: 'En attente', date: new Date() },
    { titre: 'Article 2', auteur: 'Rabab', statut: 'Publié', date: new Date() },
    { titre: 'Article 3', auteur: 'Laila', statut: 'À corriger', date: new Date() },
    { titre: 'Article 4', auteur: 'Rabab', statut: 'Publié', date: new Date() },
    { titre: 'Article 5', auteur: 'Laila', statut: 'En attente', date: new Date() }
  ];

  get auteurs() {
    return [...new Set(this.articles.map(a => a.auteur))];
  }

  get statuts() {
    return [...new Set(this.articles.map(a => a.statut))];
  }

  get filteredArticles() {
    return this.articles
      .filter(a =>
        a.titre.toLowerCase().includes(this.searchText.toLowerCase()) &&
        (this.selectedAuteur ? a.auteur === this.selectedAuteur : true) &&
        (this.selectedStatut ? a.statut === this.selectedStatut : true)
      )
      .slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(
      this.articles.filter(a =>
        a.titre.toLowerCase().includes(this.searchText.toLowerCase()) &&
        (this.selectedAuteur ? a.auteur === this.selectedAuteur : true) &&
        (this.selectedStatut ? a.statut === this.selectedStatut : true)
      ).length / this.itemsPerPage
    );
  }

  setPage(p: number) {
    if (p >= 1 && p <= this.totalPages) this.currentPage = p;
  }

  valider(article: any) {
    article.statut = 'Publié';
  }

  retourner(article: any) {
    article.statut = 'À corriger';
  }

  voir(article: any) {
    alert(`Titre : ${article.titre}\nAuteur : ${article.auteur}\nStatut : ${article.statut}`);
  }

  exportToPDF() {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Titre', 'Auteur', 'Statut', 'Date']],
      body: this.articles.map(a => [
        a.titre,
        a.auteur,
        a.statut,
        new Date(a.date).toLocaleDateString()
      ])
    });
    doc.save('mes-contributions.pdf');
  }

  exportToExcel() {
    const ws = XLSX.utils.json_to_sheet(this.articles.map(a => ({
      Titre: a.titre,
      Auteur: a.auteur,
      Statut: a.statut,
      Date: new Date(a.date).toLocaleDateString()
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Contributions');
    XLSX.writeFile(wb, 'mes-contributions.xlsx');
  }
}
