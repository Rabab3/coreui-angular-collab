import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { INavData, SidebarModule } from '@coreui/angular';
import { navItems } from './_nav';
import { DefaultFooterComponent } from './default-footer/default-footer.component';
import { DefaultHeaderComponent } from './default-header/default-header.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ThemeService, Thématique } from 'src/app/services/theme.service';
import { Subscription } from 'rxjs';

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
  public role: string | null = '';
  public filteredNavItems: INavData[] = [];
  private themeSub!: Subscription;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role') || '';

    // 🟢 Souscrire aux changements dynamiques
    this.themeSub = this.themeService.themes$.subscribe((themes: Thématique[]) => {
      this.generateMenu(themes);
    });
  }

  generateMenu(themes: Thématique[]) {
    const dynamicThématiques: INavData = {
      name: '🏷️ Thématiques',
      iconComponent: { name: 'cil-tags' },
      children: themes.map(theme => ({
        name: `${theme.icone || '📁'} ${theme.nom}`,
        url: `/thematiques/${theme.id}`
      }))
    };

    // ➕ Ajouter & Gérer une thématique (modérateur uniquement)
    if (this.role === 'moderateur') {
      dynamicThématiques.children?.push(
        {
          name: '➕ Ajouter une thématique',
          url: '/thematiques/ajouter',
          attributes: { role: ['moderateur'] }
        },
        {
          name: '📂 Gérer les thématiques',
          url: '/thematiques/gerer',
          attributes: { role: ['moderateur'] }
        }
      );
    }

    const filteredStatic = this.filterNavItems(navItems);
    this.filteredNavItems = [...filteredStatic];

    if (['moderateur', 'contributeur', 'lecteur'].includes(this.role || '')) {
      this.filteredNavItems.push(dynamicThématiques);
    }
  }

  filterNavItems(items: INavData[]): INavData[] {
    return items
      .filter(item => this.isItemVisibleForRole(item))
      .map(item => ({
        ...item,
        children: item.children?.filter(child => this.isItemVisibleForRole(child))
      }))
      .filter(item => !item.children || item.children.length > 0);
  }

  isItemVisibleForRole(item: INavData): boolean {
    const requiredRoles = (item.attributes as any)?.role;
    if (!requiredRoles) return true;
    if (Array.isArray(requiredRoles)) return requiredRoles.includes(this.role);
    return requiredRoles === this.role;
  }

  ngOnDestroy(): void {
    this.themeSub?.unsubscribe(); // 🔁 Bonnes pratiques
  }
}
