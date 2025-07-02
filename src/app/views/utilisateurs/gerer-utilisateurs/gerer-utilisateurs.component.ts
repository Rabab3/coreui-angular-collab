import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gerer-utilisateurs',
  templateUrl: './gerer-utilisateurs.component.html',
  styleUrls: ['./gerer-utilisateurs.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class GererUtilisateursComponent implements OnInit {
  utilisateurs: any[] = [];
  utilisateursFiltres: any[] = [];
  roles = ['admin', 'moderateur', 'contributeur', 'lecteur'];
  filtreRole = '';
  recherche = '';

  // Pour la modal de reset mdp
  afficherModalReset = false;
  userASecuriser: any = null;
  nouveauMdp = '';

  ngOnInit(): void {
    // Données fictives, à remplacer par appel API/service backend
    this.utilisateurs = [
      {
        id: 1,
        nom: 'Mahrache',
        prenom: 'Rabab',
        email: 'Rabab.mahrache@example.com',
        telephone: '0603322111',
        dateNaissance: '1996-03-22',
        cin: 'AA445566',
        statutMarital: 'Célibataire',
        role: 'contributeur',
        username: 'rababmah2'
      },
      {
        id: 2,
        nom: 'Moudrik',
        prenom: 'Laila',
        email: 'laila.moudrik@example.com',
        telephone: '0602211333',
        dateNaissance: '1990-01-01',
        cin: 'BB778899',
        statutMarital: 'Célibataire',
        role: 'moderateur',
        username: 'lailamdrk'
      }
    ];
    this.filtrer();
  }

  filtrer(): void {
    this.utilisateursFiltres = this.utilisateurs.filter(u => {
      const nomPrenom = `${u.nom} ${u.prenom}`.toLowerCase();
      const rechercheMatch = nomPrenom.includes(this.recherche.toLowerCase());
      const roleMatch = this.filtreRole ? u.role === this.filtreRole : true;
      return rechercheMatch && roleMatch;
    });
  }

  ouvrirModalAjout() {
    // logiques pour afficher modal d’ajout utilisateur
  }
  ouvrirModalEdit(user: any) {
    // logiques pour éditer un utilisateur
  }
  confirmerSuppression(user: any) {
    // logiques pour confirmation suppression utilisateur
  }

  ouvrirModalReset(user: any) {
    this.userASecuriser = user;
    this.afficherModalReset = true;
    this.nouveauMdp = '';
  }
  fermerModalReset() {
    this.afficherModalReset = false;
    this.userASecuriser = null;
    this.nouveauMdp = '';
  }
  genererNouveauMdp(user: any) {
    // À remplacer par un vrai appel backend !
    this.nouveauMdp = Math.random().toString(36).slice(-10);
    // Ici tu peux faire un appel au backend
    // this.userService.resetMdp(user.id).subscribe(...)
  }
  copierMdp() {
    navigator.clipboard.writeText(this.nouveauMdp);
  }
}
