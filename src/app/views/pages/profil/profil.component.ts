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
    telephone: ''
  };

  photoUrl: string = 'assets/images/avatars/2.jpg';

  ngOnInit(): void {
    this.userData = {
      nom: localStorage.getItem('nom') || 'Dupont',
      prenom: localStorage.getItem('prenom') || 'Jean',
      email: localStorage.getItem('email') || 'jean.dupont@example.com',
      dateNaissance: localStorage.getItem('dateNaissance') || '1990-01-01',
      cin: localStorage.getItem('cin') || 'AB123456',
      statutMarital: localStorage.getItem('statutMarital') || 'Célibataire',
      telephone: localStorage.getItem('telephone') || '0600000000'
    };

    const storedPhoto = localStorage.getItem('photoProfil');
    if (storedPhoto) {
      this.photoUrl = storedPhoto;
    }
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
