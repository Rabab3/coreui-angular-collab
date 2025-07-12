import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  template: '',
})
export class LogoutComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // 🔐 Supprimer tout
    localStorage.clear();
    sessionStorage.clear();

    // 🔁 Rediriger
    this.router.navigate(['/login']);
  }
}
