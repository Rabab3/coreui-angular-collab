import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    // Ici tu peux vérifier selon ta logique d'authentification
    // Par exemple : si un token existe dans le localStorage
    const token = localStorage.getItem('token'); // ou 'user' ou 'role', selon ta logique

    if (token) {
      return true; // autorise l'accès
    } else {
      // Redirige vers /login si non authentifié
      return this.router.parseUrl('/login');
    }
  }
}
