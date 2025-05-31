import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { INavData } from '@coreui/angular';
import { navItems } from './_nav';

import { SidebarModule } from '@coreui/angular'; // ✔️ OK
import { NgScrollbarModule } from 'ngx-scrollbar';

import { DefaultFooterComponent } from './default-footer/default-footer.component';
import { DefaultHeaderComponent } from './default-header/default-header.component';

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
export class DefaultLayoutComponent implements OnInit {
  public role: string | null = '';
  public filteredNavItems: INavData[] = [];

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.filteredNavItems = this.filterNavItems(navItems);
  }

  filterNavItems(items: INavData[]): INavData[] {
    return items
      .filter(item => this.isItemVisibleForRole(item))
      .map(item => ({
        ...item,
        children: item.children
          ? item.children.filter(child => this.isItemVisibleForRole(child))
          : undefined
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
