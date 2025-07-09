import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
        import('./dashboard.component').then((m) => m.DashboardComponent),
    data: { title: 'Dashboard' }
  },
  {
    path: 'dashboard-admin',
    loadComponent: () =>
        import('./dashboard-admin/dashboard-admin.component').then(m => m.DashboardAdminComponent),
    data: { title: 'Dashboard Admin' }
  },
  {
    path: 'dashboard-moderateur',
    loadComponent: () =>
        import('./dashboard-moderateur/dashboard-moderateur.component').then(m => m.DashboardModerateurComponent),
    data: { title: 'Dashboard Modérateur' }
  },
  {
    path: 'dashboard-contributeur',
    loadComponent: () =>
        import('./dashboard-contributeur/dashboard-contributeur.component').then(m => m.DashboardContributeurComponent),
    data: { title: 'Dashboard Contributeur' }
  },
  {
    path: 'dashboard-lecteur',
    loadComponent: () =>
        import('./dashboard-lecteur/dashboard-lecteur.component').then(m => m.DashboardLecteurComponent),
    data: { title: 'Dashboard Lecteur' }
  }
];
