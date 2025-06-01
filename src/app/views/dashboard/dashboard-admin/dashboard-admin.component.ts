import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartType, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent {
  stats = [
    { label: 'Articles totaux', value: 125 },
    { label: 'Utilisateurs', value: 35 },
    { label: 'Modérateurs', value: 5 },
    { label: 'Contributeurs', value: 15 }
  ];

  activites = [
    { auteur: 'Leïla', titre: 'Comment formater un PC', date: 'il y a 25h' },
    { auteur: 'Rania', titre: 'Installer Ubuntu', date: 'il y a 48h' }
  ];

  chartType: ChartType = 'doughnut';

  chartData = {
    labels: ['Admin', 'Modérateurs', 'Contributeurs', 'Lecteurs'],
    datasets: [
      {
        label: 'Répartition des rôles',
        data: [1, 5, 15, 14],
        backgroundColor: ['#4caf50', '#2196f3', '#ff9800', '#9c27b0'],
        hoverOffset: 30
      }
    ]
  };

  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: { size: 14 },
          padding: 20
        }
      }
    }
  };
}
