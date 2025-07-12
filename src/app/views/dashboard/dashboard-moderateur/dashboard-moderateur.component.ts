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
  stats = [
    { label: 'Articles à valider', value: 7 },
    { label: 'Articles retournés', value: 3 },
    { label: 'Articles validés', value: 12 }
  ];

  timeline = [
    { action: 'Validé', article: 'Guide sécurité IT', auteur: 'Leïla', date: 'il y a 2h' },
    { action: 'Retourné', article: 'Best practices Git', auteur: 'Rania', date: 'il y a 5h' },
    { action: 'Validé', article: 'Utiliser PostgreSQL', auteur: 'Nora', date: 'hier' }
  ];
}
