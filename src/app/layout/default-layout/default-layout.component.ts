import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { INavData, SidebarModule } from '@coreui/angular';
import { navItems } from './_nav';
import { DefaultFooterComponent } from './default-footer/default-footer.component';
import { DefaultHeaderComponent } from './default-header/default-header.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ThemeService } from 'src/app/services/theme.service';
import { Thématique } from 'src/app/services/theme.service';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarModule,
    NgScrollbarModule,
    DefaultHeaderComponent,
    DefaultFooterComponent
  ],
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public role: string | null = '';
  public filteredNavItems: INavData[] = [];

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role') || 'admin';
    this.generateMenu();
  }

  generateMenu() {
    const themes = this.themeService.getThemes();

    const dynamicThématiques: INavData = {
      name: '🏷️ Thématiques',
      iconComponent: { name: 'cil-tags' },
      children: themes.map(theme => ({
        name: `${theme.icone || '📁'} ${theme.nom}`,
        url: `/thematiques/${theme.id}`
      }))
    };

    if (this.role === 'admin') {
      dynamicThématiques.children?.push({
        name: '➕ Ajouter une thématique',
        url: '/thematiques/ajouter',
        attributes: { role: ['admin'] }
      });
    }

    const filteredStatic = this.filterNavItems(navItems);
    this.filteredNavItems = [...filteredStatic, dynamicThématiques];
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
}
