import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartType, ChartOptions } from 'chart.js';
// ... imports ...

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent {
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
avatarColor(role: string): string {
  switch (role) {
    case 'admin': return 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';
    case 'moderateur': return 'linear-gradient(135deg, #56ccf2 0%, #2f80ed 100%)';
    case 'contributeur': return 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)';
    case 'lecteur': return 'linear-gradient(135deg, #b224ef 0%, #7579ff 100%)';
    default: return '#bbb';
  }
}

  demandesReset = [
    { nom: 'Marzak', prenom: 'karim', role: 'contributeur', date: 'il y a 30min' },
    { nom: 'Antali', prenom: 'Souad', role: 'moderateur', date: 'il y a 1h' },
    { nom: 'Chaibi', prenom: 'Hanane', role: 'lecteur', date: 'il y a 3h' }
  ];
}
