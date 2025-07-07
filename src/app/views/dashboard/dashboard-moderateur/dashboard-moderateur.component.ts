import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import {
  ChartData,
  ChartDataset,
  ChartOptions
} from 'chart.js';

@Component({
  selector: 'app-dashboard-moderateur',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
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

  dates = ['01/07', '02/07', '03/07', '04/07', '05/07', '06/07', '07/07'];

  validatedChartData: ChartData<'bar'> = {
    labels: this.dates,
    datasets: [
      {
        data: [2, 3, 1, 4, 2, 3, 1],
        label: 'Validés',
        backgroundColor: '#28a745'
      }
    ]
  };

  pendingChartData: ChartData<'line'> = {
    labels: this.dates,
    datasets: [
      {
        data: [5, 4, 6, 5, 3, 4, 3],
        label: 'À valider',
        borderColor: '#ffc107',
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.4
      }
    ]
  };

  globalChartData: ChartData<'bar'> = {
    labels: this.dates,
    datasets: [
      {
        data: [2, 3, 1, 4, 2, 3, 1],
        label: 'Validés',
        backgroundColor: '#17a2b8'
      },
      {
        data: [1, 0, 2, 1, 1, 0, 1],
        label: 'Retournés',
        backgroundColor: '#ffc107'
      },
      {
        data: [5, 4, 6, 5, 3, 4, 3],
        label: 'À valider',
        backgroundColor: '#dc3545'
      }
    ]
  };

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      }
    },
    scales: {
      x: {},
      y: {
        beginAtZero: true
      }
    }
  };
}
