import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';

export const routes: Routes = [
  // Layout principal (pages avec sidebar + header)
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./views/dashboard/dashboard.component').then(m => m.DashboardComponent),
        data: { title: 'Dashboard' }
      },
      
        {
  path: 'articles/ajouter',
  loadComponent: () =>
    import('./views/articles/article-add/article-add.component').then(m => m.ArticleAddComponent),
        data: { title: 'Ajouter un article' }
      },
      {
        path: 'articles/mes-contributions',
        loadComponent: () =>
          import('./views/articles/mes-contributions/mes-contributions.component').then(m => m.MesContributionsComponent),
        data: { title: 'Mes contributions' }
      }
,
      {
        path: 'articles/liste',
        loadComponent: () =>
          import('./views/articles/article-list/article-list.component').then(m => m.ArticleListComponent),
        data: { title: 'Liste des articles' }
      },
      {
        path: 'articles/favoris',
        loadComponent: () =>
          import('./views/articles/favoris-list/favoris-list.component').then(m => m.FavorisListComponent),
        data: { title: 'Favoris' }
      },
      {
        path: 'moderation/liste-a-valider',
        loadComponent: () =>
          import('./views/a-valider/a-valider.component').then(m => m.AValiderComponent),
        data: { title: 'Articles à valider' }
      },
      {
        path: 'moderation/a-corriger',
        loadComponent: () =>
          import('./views/a-corriger/a-corriger.component').then(m => m.ACorrigerComponent),
        data: { title: 'Articles à corriger' }
      },
      {
        path: 'utilisateurs',
        loadComponent: () =>
          import('./views/utilisateurs/utilisateurs.component').then(m => m.UtilisateursComponent),
        data: { title: 'Utilisateurs' }
      },
      {
        path: 'thematiques',
        loadComponent: () =>
          import('./views/par-thematique/thematique/thematique.component').then(m => m.ThematiqueComponent),
        data: { title: 'Thématiques' }
      },
      {
        path: 'roles',
        loadComponent: () =>
          import('./views/roles/roles.component').then(m => m.RolesComponent),
        data: { title: 'Rôles' }
      },
      {
        path: 'parametres/profil',
        loadComponent: () =>
          import('./views/pages/profil/profil.component').then(m => m.ProfilComponent),
        data: { title: 'Mon Profil' }
      }
    ]
  },

  // Pages sans layout
  {
    path: 'login',
    loadComponent: () =>
      import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: { title: 'Login Page' }
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./views/pages/register/register.component').then(m => m.RegisterComponent),
    data: { title: 'Register Page' }
  },
  {
    path: '404',
    loadComponent: () =>
      import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    data: { title: 'Page 404' }
  },
  {
    path: '500',
    loadComponent: () =>
      import('./views/pages/page500/page500.component').then(m => m.Page500Component),
    data: { title: 'Page 500' }
  },

  // Redirection inconnue
  {
    path: '**',
    redirectTo: '404'
  }
];
