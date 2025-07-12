import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardModerateurComponent } from './dashboard-moderateur/dashboard-moderateur.component';
import { DashboardContributeurComponent } from './dashboard-contributeur/dashboard-contributeur.component';
import { DashboardLecteurComponent } from './dashboard-lecteur/dashboard-lecteur.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    DashboardAdminComponent,
    DashboardModerateurComponent,
    DashboardContributeurComponent,
    DashboardLecteurComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  role = localStorage.getItem('role') || 'admin';
}