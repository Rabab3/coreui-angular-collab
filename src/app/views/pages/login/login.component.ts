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
  showForgotPopup = false; // Pour le popup

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

  onForgotPassword(event: Event): void {
    event.preventDefault();
    this.showForgotPopup = true;
  }

  closeForgotPopup(): void {
    this.showForgotPopup = false;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMsg = '';
      const data = this.loginForm.value;
      this.authService.login(data).subscribe({
        next: (res) => {
          this.loading = false;
          localStorage.setItem('token', res.accessToken);
          localStorage.setItem('role', res.role);

          const role = res.role ? res.role.toLowerCase() : '';

          if (role === 'admin') {
            this.router.navigate(['/dashboard']);
          } else if (role === 'moderateur') {
            this.router.navigate(['/moderation/avalider']);
          } else if (role === 'contributeur') {
            this.router.navigate(['/articles/mes-contributions']);
          } else if (role === 'lecteur') {
            this.router.navigate(['/articles/liste']);
          } else {
            this.router.navigate(['/']);
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
