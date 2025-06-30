import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMsg = '';
  showPassword = false;
  loading = false;
  btnActive = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;  // Démarre le spinner
      this.errorMsg = '';   // Reset l'erreur éventuelle
      const data = this.loginForm.value;
      this.authService.login(data).subscribe({
        next: (res) => {
          this.loading = false;
          localStorage.setItem('token', res.accessToken);
          const role = res.role;

          if (role === 'ADMIN') {
            this.router.navigate(['/dashboard']);
          } else if (role === 'MODERATEUR') {
            this.router.navigate(['/moderation/liste-a-valider']);
          } else {
            this.router.navigate(['/articles/liste']);
          }
        },
        error: () => {
          this.loading = false;
          this.errorMsg = 'Nom d’utilisateur ou mot de passe incorrect';
        }
      });
    }
  }
}
