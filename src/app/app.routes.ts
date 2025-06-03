import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { ThematiqueComponent } from './views/par-thematique/thematique/thematique.component';

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      { path: 'dashboard', loadComponent: () => import('./views/dashboard/dashboard.component').then(m => m.DashboardComponent) },

      { path: 'articles/ajouter', loadComponent: () => import('./views/articles/article-add/article-add.component').then(m => m.ArticleAddComponent) },

      { path: 'articles/mes-contributions', loadComponent: () => import('./views/articles/mes-contributions/mes-contributions.component').then(m => m.MesContributionsComponent) },

      { path: 'articles/liste', loadComponent: () => import('./views/articles/article-list/article-list.component').then(m => m.ArticleListComponent) },

      { path: 'articles/favoris', loadComponent: () => import('./views/articles/favoris-list/favoris-list.component').then(m => m.FavorisListComponent) },

      { path: 'moderation/liste-a-valider', loadComponent: () => import('./views/a-valider/a-valider.component').then(m => m.AValiderComponent) },

      { path: 'moderation/a-corriger', loadComponent: () => import('./views/a-corriger/a-corriger.component').then(m => m.ACorrigerComponent) },

      { path: 'utilisateurs', loadComponent: () => import('./views/utilisateurs/utilisateurs.component').then(m => m.UtilisateursComponent) },

      { path: 'thematiques/ajouter', loadComponent: () => import('./views/par-thematique/theme/theme-add.component').then(m => m.ThemeAddComponent) },

      { path: 'thematiques/ajouter', loadComponent: () => import('./views/par-thematique/theme/theme-add.component').then(m => m.ThemeAddComponent),
      data: { title: 'Ajouter une thématique' } },

      { path: 'thematiques/gerer', loadComponent: () => import('./views/par-thematique/theme/theme-manage.component').then(m => m.ThemeManageComponent), data: { title: 'Gérer les thématiques' } },

      { path: 'thematiques/:id', loadComponent: () => import('./views/par-thematique/theme-articles/theme-articles.component').then(m => m.ThemeArticlesComponent), data: { title: 'Articles par thématique' } },
      
      { path: 'articles/details/:id', loadComponent: () => import('./views/articles/article-details/article-details.component').then(m => m.ArticleDetailsComponent), data: { title: 'Détails de l\'article' } },
      
      { path: 'roles', loadComponent: () => import('./views/roles/roles.component').then(m => m.RolesComponent) },

      { path: 'parametres/profil', loadComponent: () => import('./views/pages/profil/profil.component').then(m => m.ProfilComponent) }
    ]
  },

  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component)
  },
  {
    path: '500',
    loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component)
  },

  { path: '**', redirectTo: '404' }
];
