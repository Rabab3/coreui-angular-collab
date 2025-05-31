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

  onSubmit(): void {
    if (this.loginForm.valid) {
      const data = this.loginForm.value;
      this.authService.login(data).subscribe({
        next: (res) => {
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
          this.errorMsg = 'Nom d’utilisateur ou mot de passe incorrect';
        }
      });
    }
  }
}
