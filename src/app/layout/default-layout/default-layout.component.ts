import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { INavData, SidebarModule } from '@coreui/angular';
import { navItems } from './_nav';
import { DefaultFooterComponent } from './default-footer/default-footer.component';
import { DefaultHeaderComponent } from './default-header/default-header.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ThemeService, Thématique } from 'src/app/services/theme.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  templateUrl: './default-layout.component.html',
  imports: [
    RouterOutlet,
    SidebarModule,
    NgScrollbarModule,
    DefaultHeaderComponent,
    DefaultFooterComponent
  ]
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {
  public role: string = '';
  public filteredNavItems: INavData[] = [];
  private themeSub!: Subscription;

  constructor(
      private themeService: ThemeService,
      private authService: AuthService
  ) {}

  ngOnInit(): void {
    const fullRole = this.authService.getRole();
    console.log("🟡 Rôle dans default-layout :", fullRole);

    this.role = fullRole ? fullRole.replace('ROLE_', '').toLowerCase() : '';

    const staticNav = this.getStaticMenuByRole(this.role);
    this.filteredNavItems = [...staticNav];
  }


  getStaticMenuByRole(role: string): INavData[] {
    switch (role) {
      case 'admin':
        return [
          {
            name: 'Accueil',
            url: '/dashboard-admin',
            iconComponent: { name: 'cil-home' }
          },
          {
            name: 'Utilisateurs',
            url: '/admin/utilisateurs/gerer',
            iconComponent: { name: 'cil-user' }
          },
          {
            name: 'Rôles',
            url: '/admin/utilisateurs/roles',
            iconComponent: { name: 'cil-lock-locked' }
          },
          {
            name: 'Paramètres',
            url: '/parametres/profil',
            iconComponent: { name: 'cil-settings' }
          }
        ];
      case 'moderateur':
        return [
          {
            name: 'Accueil',
            url: '/dashboard-moderateur',
            iconComponent: { name: 'cil-home' }
          },
          {
            name: 'Articles',
            iconComponent: { name: 'cil-library' },
            children: [
              { name: 'Liste des articles', url: '/articles/liste', iconComponent: { name: 'cil-list' } },
              { name: 'Favoris', url: '/articles/favoris', iconComponent: { name: 'cil-star' } },
              { name: 'Mes contributions', url: '/articles/mes-contributions', iconComponent: { name: 'cil-description' } },
              { name: 'Ajouter un article', url: '/articles/ajouter', iconComponent: { name: 'cil-note-add' } },
              { name: 'Brouillons', url: '/articles/brouillons', iconComponent: { name: 'cil-pencil' } }
            ]
          },
          {
            name: 'Modération',
            iconComponent: { name: 'cil-task' },
            children: [
              { name: 'À valider', url: '/moderation/avalider', iconComponent: { name: 'cil-check' } },
              { name: 'À corriger', url: '/moderation/acorriger', iconComponent: { name: 'cil-warning' } }
            ]
          },
          {
            name: 'Thématiques',
            iconComponent: { name: 'cil-tags' },
            children: [
              { name: '📌 Métiers', url: '/thematiques/metier' },
              { name: '⚙️ Technique', url: '/thematiques/technique' },
              { name: '🔐 Sécurité', url: '/thematiques/securite' },
              { name: '🧑‍💼 RH', url: '/thematiques/rh' },
              { name: '➕ Ajouter une thématique', url: '/thematiques/ajouter' },
              { name: '📂 Gérer les thématiques', url: '/thematiques/gerer' }
            ]
          },
          {
            name: 'Paramètres',
            url: '/parametres/profil',
            iconComponent: { name: 'cil-settings' }
          }
        ];

      case 'contributeur':
        return [
          {
            name: 'Accueil',
            url: '/dashboard-contributeur',
            iconComponent: { name: 'cil-home' }
          },
          {
            name: 'Articles',
            iconComponent: { name: 'cil-library' },
            children: [
              {
                name: 'Liste des articles',
                url: '/articles/liste',
                iconComponent: { name: 'cil-list' }
              },
              {
                name: 'Favoris',
                url: '/articles/favoris',
                iconComponent: { name: 'cil-star' }
              },
              {
                name: 'Mes contributions',
                url: '/articles/mes-contributions',
                iconComponent: { name: 'cil-description' }
              },
              {
                name: 'Ajouter un article',
                url: '/articles/ajouter',
                iconComponent: { name: 'cil-note-add' }
              },
              {
                name: 'Brouillons',
                url: '/articles/brouillons',
                iconComponent: { name: 'cil-pencil' }
              }
            ]
          },
          {
            name: 'Thématiques',
            iconComponent: { name: 'cil-tags' },
            children: [
              { name: '📌 Métiers', url: '/thematiques/metier' },
              { name: '⚙️ Technique', url: '/thematiques/technique' },
              { name: '🔐 Sécurité', url: '/thematiques/securite' },
              { name: '🧑‍💼 RH', url: '/thematiques/rh' }
            ]
          },
          {
            name: 'Paramètres',
            url: '/parametres/profil',
            iconComponent: { name: 'cil-settings' }
          }
        ];

      case 'lecteur':
        return [
          {
            name: 'Accueil',
            url: '/dashboard-lecteur',
            iconComponent: { name: 'cil-home' }
          },
          {
            name: 'Articles',
            url: '/articles/liste',
            iconComponent: { name: 'cil-list' }
          },
          {
            name: 'Favoris',
            url: '/articles/favoris',
            iconComponent: { name: 'cil-star' }
          },
          {
            name: 'Thématiques',
            iconComponent: { name: 'cil-tags' },
            children: [
              { name: '📌 Métiers', url: '/thematiques/metier' },
              { name: '⚙️ Technique', url: '/thematiques/technique' },
              { name: '🔐 Sécurité', url: '/thematiques/securite' },
              { name: '🧑‍💼 RH', url: '/thematiques/rh' }
            ]
          },
          {
            name: 'Paramètres',
            url: '/parametres/profil',
            iconComponent: { name: 'cil-settings' }
          }
        ];

      default:
        return [
          {
            name: 'Accueil',
            url: '/dashboard',
            iconComponent: { name: 'cil-home' }
          }
        ];
    }
  }

  buildDynamicThématiqueMenu(themes: Thématique[]): INavData {
    const children: INavData[] = [
      { name: '📌 Métiers', url: '/thematiques/metier' },
      { name: '⚙️ Technique', url: '/thematiques/technique' },
      { name: '🔐 Sécurité', url: '/thematiques/securite' },
      { name: '🧑‍💼 RH', url: '/thematiques/rh' },
      ...themes.map(theme => ({
        name: `${theme.icone || '📁'} ${theme.nom}`,
        url: `/thematiques/${theme.id}`
      }))
    ];

    if (this.role === 'moderateur') {
      children.push(
          {
            name: '➕ Ajouter une thématique',
            url: '/thematiques/ajouter'
          },
          {
            name: '📂 Gérer les thématiques',
            url: '/thematiques/gerer'
          }
      );
    }

    return {
      name: 'Thématiques',
      iconComponent: { name: 'cil-tags' },
      children
    };
  }

  ngOnDestroy(): void {
    this.themeSub?.unsubscribe();
  }
}
