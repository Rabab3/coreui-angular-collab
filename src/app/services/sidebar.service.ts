import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private sidebarState = new BehaviorSubject<string>('expanded');
  sidebarState$ = this.sidebarState.asObservable();

  setCollapsed(isCollapsed: boolean) {
    this.sidebarState.next(isCollapsed ? 'collapsed' : 'expanded');
  }
}
