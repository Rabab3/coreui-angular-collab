import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { INavData, SidebarModule } from '@coreui/angular';
import { navItems } from './_nav';

import { DefaultFooterComponent } from './default-footer/default-footer.component';
import { DefaultHeaderComponent } from './default-header/default-header.component';

import { NgScrollbarModule } from 'ngx-scrollbar';

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

  ngOnInit(): void {
  this.role = localStorage.getItem('role') || 'admin';
  this.filteredNavItems = this.filterNavItems(navItems);
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
