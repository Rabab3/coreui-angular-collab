import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
templateUrl: './profil.component.html',  
  styleUrls: ['./profil.component.scss'] 
})
export class ProfilComponent implements OnInit
 {

  userData = {
    nom: '',
    prenom: '',
    email: '',
    dateNaissance: '',
    cin: '',
    statutMarital: ''
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.userData = {
      nom: localStorage.getItem('nom') || 'Dupont',
      prenom: localStorage.getItem('prenom') || 'Jean',
      email: localStorage.getItem('email') || 'jean.dupont@example.com',
      dateNaissance: localStorage.getItem('dateNaissance') || '1990-01-01',
      cin: localStorage.getItem('cin') || 'AB123456',
      statutMarital: localStorage.getItem('statutMarital') || 'Célibataire'
    };
  }

  deconnexion(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
