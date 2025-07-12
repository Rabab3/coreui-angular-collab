import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  userData = {
    nom: '',
    prenom: '',
    email: '',
    dateNaissance: '',
    cin: '',
    statutMarital: '',
    telephone: '',
    username: '',
    role: ''
  };

  photoUrl: string = '';
  initials: string = '';

  ngOnInit(): void {
    // Simulation pour l'exemple (remplace par ce que tu veux récupérer du storage ou d'une API)
    this.userData = {
      nom: localStorage.getItem('nom') || 'Bensaid',
      prenom: localStorage.getItem('prenom') || 'Amine',
      email: localStorage.getItem('email') || 'Amine.Bensaid@example.com',
      dateNaissance: localStorage.getItem('dateNaissance') || '1990-11-15',
      cin: localStorage.getItem('cin') || 'SA332216',
      statutMarital: localStorage.getItem('statutMarital') || 'Marié',
      telephone: localStorage.getItem('telephone') || '0689563464',
      username: localStorage.getItem('username') || 'AmineMd90',
      role: localStorage.getItem('role') || 'admin'
    };

    this.photoUrl = localStorage.getItem('photoProfil') || '';

    // Initiales (si pas de photo)
    this.initials = (
      (this.userData.prenom ? this.userData.prenom[0] : '') +
      (this.userData.nom ? this.userData.nom[0] : '')
    ).toUpperCase();
  }

  onPhotoSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.photoUrl = reader.result as string;
        localStorage.setItem('photoProfil', this.photoUrl);
      };
      reader.readAsDataURL(file);
    }
  }
}
