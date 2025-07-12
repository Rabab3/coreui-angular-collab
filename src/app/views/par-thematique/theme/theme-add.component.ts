import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ThemeService, Thématique } from 'src/app/services/theme.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-add',
  standalone: true,
  templateUrl: './theme-add.component.html',
  styleUrls: ['./theme-add.component.scss'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class ThemeAddComponent {
  themeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private themeService: ThemeService,
    private router: Router
  ) {
    this.themeForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      icone: ['']
    });
  }

  onSubmit() {
    if (this.themeForm.valid) {
      const existingThemes = this.themeService.getThemes();
      const newTheme: Thématique = {
        id: existingThemes.length > 0 ? Math.max(...existingThemes.map(t => t.id)) + 1 : 1,
        ...this.themeForm.value
      };

      this.themeService.addTheme(newTheme);
      alert(`✅ Thématique "${newTheme.nom}" ajoutée avec succès !`);
      this.themeForm.reset();
      this.router.navigate(['/thematiques/gerer']);
    }
  }

  annuler() {
    this.themeForm.reset();
  }
}