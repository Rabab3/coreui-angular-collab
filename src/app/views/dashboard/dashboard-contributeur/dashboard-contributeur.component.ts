import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-contributeur',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-contributeur.component.html',
  styleUrls: ['./dashboard-contributeur.component.scss']
})
export class DashboardContributeurComponent {
  stats = [
    { label: 'Articles soumis', value: 10 },
    { label: 'Articles publiés', value: 6 },
    { label: 'Articles en attente', value: 4 }
  ];

  topArticles = [
    { titre: 'Les bonnes pratiques Angular', vues: 120, icone: '' },
    { titre: 'Comprendre Spring Boot', vues: 95, icone: '' },
    { titre: 'PostgreSQL pour les devs', vues: 80, icone: '' }
  ];
}
