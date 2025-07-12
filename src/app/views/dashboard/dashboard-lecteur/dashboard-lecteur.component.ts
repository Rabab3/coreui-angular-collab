import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-lecteur',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-lecteur.component.html',
  styleUrls: ['./dashboard-lecteur.component.scss']
})
export class DashboardLecteurComponent {
  articlesRecents = [
    'Guide de la sécurité numérique',
    'Introduction à PostgreSQL',
    'Bonnes pratiques Git'
  ];

  articlesPopulaires = [
    { titre: 'Maîtriser Angular', vues: 120 },
    { titre: 'Gestion de projet Agile', vues: 110 },
    { titre: 'Sécurité des données', vues: 105 }
  ];

  thematiques = ['Technique', 'Métiers', 'Sécurité', 'RH'];

  citationDuJour = '“Le savoir ne vaut que s’il est partagé.” – Anonyme';
}
