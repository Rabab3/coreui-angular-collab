import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, Thématique } from 'src/app/services/theme.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-theme-manage',
  standalone: true,
  templateUrl: './theme-manage.component.html',
  styleUrls: ['./theme-manage.component.scss'],
  imports: [CommonModule],
  animations: [
    trigger('fadeOut', [
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0, transform: 'translateX(20px)' }))
      ])
    ])
  ]
})
export class ThemeManageComponent implements OnInit {
  themes: Thématique[] = [];
  role: string | null = '';

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    if (this.role !== 'moderateur') {
      this.router.navigate(['/dashboard']);
      return;
    }
   this.themeService.themes$.subscribe(data => this.themes = data);

  }

  supprimerTheme(id: number) {
    const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cette thématique ?");
    if (confirmation) {
      this.themeService.deleteTheme(id);
      this.toastr.success('Thématique supprimée avec succès');
    }
  }
}