import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-moderateur',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-moderateur.component.html',
  styleUrls: ['./dashboard-moderateur.component.scss']
})
export class DashboardModerateurComponent {
  // Liste des articles retournés pour correction
  articlesRetournes = [
    { titre: 'Article 1', auteur: 'Laila', date: '2025-05-29' },
    { titre: 'Article 2', auteur: 'Rabab', date: '2025-05-30' }
  ];

  // Timeline des actions récentes
  timeline = [
    { auteur: 'Laila', action: 'a retourné un article', date: '2025-05-30' },
    { auteur: 'Rabab', action: 'a validé un article', date: '2025-05-29' }
  ];

  // Taux de retour fictif
  tauxRetour = 43;
}
