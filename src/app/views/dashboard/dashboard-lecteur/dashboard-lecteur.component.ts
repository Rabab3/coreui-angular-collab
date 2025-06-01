import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-lecteur',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-lecteur.component.html',
  styleUrls: ['./dashboard-lecteur.component.scss']
})
export class DashboardLecteurComponent implements OnInit {
  articlesRecents = [
    { titre: 'L’innovation RH', date: '31 mai 2025' },
    { titre: 'Sécurité numérique', date: '30 mai 2025' },
    { titre: 'Bonnes pratiques internes', date: '29 mai 2025' }
  ];

  thematiques = ['RH', 'Sécurité', 'Technique', 'Métiers'];

  topLus = [
    { titre: 'Optimiser la communication interne', vues: 143 },
    { titre: 'Cyber sécurité pour débutants', vues: 121 }
  ];

  citation = '« La connaissance est le début de l’action. » – Confucius';

  ngOnInit(): void {}
}
