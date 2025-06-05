import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gerer-utilisateurs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gerer-utilisateurs.component.html',
  styleUrls: ['./gerer-utilisateurs.component.scss']
})
export class GererUtilisateursComponent implements OnInit {
  utilisateurs: any[] = [];
  utilisateursFiltres: any[] = [];
  utilisateurActuel: any = null;
  showModal = false;
  recherche = '';
  filtreRole = '';

  ngOnInit(): void {
    this.utilisateurs = [
      {
        id: 1,
        nom: 'Karim',
        prenom: 'Leïla',
        email: 'leila@example.com',
        telephone: '0600000001',
        dateNaissance: '1995-05-15',
        cin: 'AB100100',
        statutMarital: 'Célibataire',
        role: 'contributeur'
      },
      {
        id: 2,
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'jean@example.com',
        telephone: '0600000002',
        dateNaissance: '1990-01-01',
        cin: 'AB200200',
        statutMarital: 'Marié',
        role: 'moderateur'
      }
    ];
    this.actualiserListe();
  }

  actualiserListe() {
    this.utilisateursFiltres = this.utilisateurs.filter(user => {
      const matchNomPrenom = `${user.nom} ${user.prenom}`.toLowerCase().includes(this.recherche.toLowerCase());
      const matchRole = this.filtreRole ? user.role === this.filtreRole : true;
      return matchNomPrenom && matchRole;
    });
  }

  ouvrirModal(user: any) {
    this.utilisateurActuel = { ...user };
    this.showModal = true;
  }

  fermerModal() {
    this.showModal = false;
  }

  enregistrerModifications() {
    this.utilisateurs = this.utilisateurs.map(u =>
      u.id === this.utilisateurActuel.id ? this.utilisateurActuel : u
    );
    this.fermerModal();
    this.actualiserListe();
  }

  supprimerUtilisateur(id: number) {
    const confirmDelete = confirm('Supprimer cet utilisateur ?');
    if (confirmDelete) {
      this.utilisateurs = this.utilisateurs.filter(u => u.id !== id);
      this.actualiserListe();
    }
  }
}
