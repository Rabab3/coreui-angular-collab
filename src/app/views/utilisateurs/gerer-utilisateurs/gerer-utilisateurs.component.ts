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
  showAjoutModal = false;
  showPopupCredentials = false;
  popupTitre = '';
  popupUsername = '';
  popupPassword = '';
  recherche = '';
  filtreRole = '';
  showToast = false;
  toastMsg = '';

  ajoutUser: any = {
    nom: '', prenom: '', email: '', telephone: '', dateNaissance: '',
    cin: '', statutMarital: 'Célibataire', role: 'contributeur'
  };

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
        role: 'contributeur',
        username: 'leilaKarim45'
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
        role: 'moderateur',
        username: 'jeanDupont82'
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
    this.afficherToast("Utilisateur modifié avec succès !");
  }

  supprimerUtilisateur(id: number) {
    const confirmDelete = confirm('Supprimer cet utilisateur ?');
    if (confirmDelete) {
      this.utilisateurs = this.utilisateurs.filter(u => u.id !== id);
      this.actualiserListe();
      this.afficherToast("Utilisateur supprimé !");
    }
  }

  // --- AJOUT UTILISATEUR
  ouvrirAjoutUtilisateur() {
    this.ajoutUser = {
      nom: '', prenom: '', email: '', telephone: '', dateNaissance: '',
      cin: '', statutMarital: 'Célibataire', role: 'contributeur'
    };
    this.showAjoutModal = true;
  }
  fermerAjoutUtilisateur() {
    this.showAjoutModal = false;
  }
  confirmerAjoutUtilisateur() {
    // Générer username/mot de passe
    const username = this.genererUsername(this.ajoutUser.nom, this.ajoutUser.prenom);
    const password = this.genererPassword();
    const id = this.utilisateurs.length ? Math.max(...this.utilisateurs.map(u => u.id)) + 1 : 1;
    const newUser = {
      id,
      ...this.ajoutUser,
      username
    };
    this.utilisateurs.push(newUser);
    this.fermerAjoutUtilisateur();
    this.actualiserListe();
    this.popupTitre = "Utilisateur ajouté avec succès !";
    this.popupUsername = username;
    this.popupPassword = password;
    this.showPopupCredentials = true;
    this.afficherToast("Utilisateur ajouté avec succès !");
  }

  // --- RÉINITIALISER MOT DE PASSE
  ouvrirResetPassword(user: any) {
    const username = user.username;
    const newPass = this.genererPassword();
    this.popupTitre = `Nouveau mot de passe pour ${user.nom} ${user.prenom}`;
    this.popupUsername = username;
    this.popupPassword = newPass;
    this.showPopupCredentials = true;
    this.afficherToast("Mot de passe réinitialisé !");
  }

  fermerPopupCredentials() {
    this.showPopupCredentials = false;
  }

  copierValeur(val: string) {
    navigator.clipboard.writeText(val);
    this.afficherToast("Copié !");
  }
  copierTout() {
    navigator.clipboard.writeText(
      `Nom d'utilisateur : ${this.popupUsername}\nMot de passe : ${this.popupPassword}`
    );
    this.afficherToast("Tout copié !");
  }

  afficherToast(msg: string) {
    this.toastMsg = msg;
    this.showToast = true;
    setTimeout(() => this.showToast = false, 2200);
  }

  genererUsername(nom: string, prenom: string): string {
    const base = (prenom + nom).toLowerCase().replace(/[^a-z0-9]/gi, '');
    const rand = Math.random() < 0.5
      ? Math.floor(100 + Math.random() * 899).toString()
      : '';
    return base + rand;
  }
  genererPassword(): string {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*";
    let pwd = "";
    for (let i = 0; i < 8; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pwd;
  }
}
