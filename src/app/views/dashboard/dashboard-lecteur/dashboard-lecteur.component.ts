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
    {
      titre: 'Guide sécurité numérique',
      nom: 'Karim',
      prenom: 'A.',
      date: '2025-07-05'
    },
    {
      titre: 'PostgreSQL simplifié',
      nom: 'Nora',
      prenom: 'L.',
      date: '2025-07-03'
    },
    {
      titre: 'Git & bonnes pratiques',
      nom: 'Ali',
      prenom: 'M.',
      date: '2025-07-01'
    }
  ];

  activite = {
    articlesLus: 24,
    tempsLecture: 132,
    evolution: 12
  };

  citation = '📯 Lire, c’est semer dans son esprit.';
}
