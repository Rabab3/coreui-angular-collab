import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-contributeur',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-contributeur.component.html',
  styleUrl: './dashboard-contributeur.component.scss'
})
export class DashboardContributeurComponent {
  totalArticles = 12;
  articlesPublies = 8;
  topArticles = [
    { titre: 'Sécurité informatique', vues: 150 },
    { titre: 'Gestion RH', vues: 120 },
    { titre: 'Maintenance réseau', vues: 100 }
  ];
}