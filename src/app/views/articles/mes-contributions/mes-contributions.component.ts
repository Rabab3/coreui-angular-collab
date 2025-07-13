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

  showModal = false;
  articleEnCours: any = null;

  articles = [
    {
      titre: 'Sécurité API',
      auteur: 'Rabab',
      statut: 'En attente',
      date: new Date('2025-05-31')
    },
    {
      titre: 'Système RH',
      auteur: 'Laila',
      statut: 'À corriger',
      retourCommentaire: 'Merci de préciser les outils RH utilisés.',
      date: new Date('2025-05-30')
    },
  ];

  get filteredArticles() {
    return this.articles.filter(article =>
      article.titre.toLowerCase().includes(this.searchText.toLowerCase()) ||
      article.auteur?.toLowerCase().includes(this.searchText.toLowerCase())
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

  ouvrirModal(article: any): void {
    this.articleEnCours = {
      ...article,
      contenu: `Dans un contexte de transformation digitale, les Systèmes d’Information des Ressources Humaines (SIRH) jouent un rôle central dans l’automatisation des processus RH. Cet article explore trois solutions majeures : SAP SuccessFactors, Workday et OrangeHRM. Ces outils permettent une meilleure gestion des talents, un suivi précis des performances, et une dématérialisation complète du cycle RH (recrutement, onboarding, gestion des compétences, etc.).

👉 Par exemple, SAP SuccessFactors permet de créer des workflows personnalisés, tandis que Workday offre une interface utilisateur intuitive pour les collaborateurs. OrangeHRM, quant à lui, se distingue par sa flexibilité open-source pour les PME.

🔗 Source : https://www.soluces-rh.com/outils-sirh-2025
🔖 #RH #TransformationDigitale #SIRH #Recrutement #Workday #SAP #OrangeHRM`
    };
    this.showModal = true;
  }

  envoyerCorrection(): void {
    if (this.articleEnCours) {
      this.articleEnCours.statut = 'En attente';
      this.articleEnCours.retourCommentaire = null;
      this.showModal = false;
    }
  }

  annuler(): void {
    this.showModal = false;
    this.articleEnCours = null;
  }
}
