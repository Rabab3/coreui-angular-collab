import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-gerer-utilisateurs',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
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

  showDeleteConfirm = false;
  userToDeleteId: number | null = null;

  ajoutUser: any = {
    nom: '', prenom: '', email: '', telephone: '', dateNaissance: '',
    cin: '', role: 'contributeur'
  };

  constructor(private utilisateurService: UtilisateurService) {}

  ngOnInit(): void {
    this.utilisateurService.getAllUsers().subscribe({
      next: (data) => {
        this.utilisateurs = data;
        this.actualiserListe();
      },
      error: (err) => {
        console.error("Erreur lors du chargement des utilisateurs :", err);
      }
    });
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
    this.utilisateurService.updateUser(this.utilisateurActuel.id, this.utilisateurActuel).subscribe({
      next: () => {
        this.utilisateurs = this.utilisateurs.map(u =>
            u.id === this.utilisateurActuel.id ? this.utilisateurActuel : u
        );
        this.fermerModal();
        this.actualiserListe();
        this.afficherToast("Utilisateur modifié avec succès !");
      },
      error: (err) => {
        console.error("Erreur lors de la mise à jour :", err);
        this.afficherToast("Erreur lors de la modification");
      }
    });
  }

  changerMotDePasse(user: any) {
    const newPass = this.genererPassword();
    this.utilisateurService.updatePassword(user.id, newPass).subscribe({
      next: () => {
        this.popupTitre = `Nouveau mot de passe pour ${user.nom} ${user.prenom}`;
        this.popupUsername = user.username;
        this.popupPassword = newPass;
        this.showPopupCredentials = true;
        this.afficherToast("Mot de passe mis à jour !");
      },
      error: () => {
        this.afficherToast("Erreur lors du changement de mot de passe !");
      }
    });
  }

  supprimerUtilisateur(id: number) {
    this.userToDeleteId = id;
    this.showDeleteConfirm = true;
  }

  confirmerSuppression() {
    if (this.userToDeleteId !== null) {
      this.utilisateurService.deleteUser(this.userToDeleteId).subscribe({
        next: () => {
          this.utilisateurs = this.utilisateurs.filter(u => u.id !== this.userToDeleteId);
          this.actualiserListe();
          this.afficherToast("Utilisateur supprimé !");
        },
        error: () => {
          this.afficherToast("Erreur lors de la suppression !");
        }
      });
      this.showDeleteConfirm = false;
      this.userToDeleteId = null;
    }
  }

  annulerSuppression() {
    this.showDeleteConfirm = false;
    this.userToDeleteId = null;
  }

  ouvrirAjoutUtilisateur() {
    this.ajoutUser = {
      nom: '', prenom: '', email: '', telephone: '', dateNaissance: '',
      cin: '', role: 'contributeur'
    };
    this.showAjoutModal = true;
  }

  fermerAjoutUtilisateur() {
    this.showAjoutModal = false;
  }

  confirmerAjoutUtilisateur() {
    const username = this.genererUsername(this.ajoutUser.nom, this.ajoutUser.prenom);
    const password = this.genererPassword();

    const userDto = {
      username,
      nom: this.ajoutUser.nom,
      prenom: this.ajoutUser.prenom,
      email: this.ajoutUser.email,
      telephone: this.ajoutUser.telephone,
      dateNaissance: this.ajoutUser.dateNaissance,
      cin: this.ajoutUser.cin,
      roles: [`ROLE_${this.ajoutUser.role.toUpperCase()}`]
    };

    this.utilisateurService.createUser(userDto, password).subscribe({
      next: (createdUser) => {
        this.utilisateurs.push(createdUser);
        this.fermerAjoutUtilisateur();
        this.popupTitre = "Utilisateur ajouté avec succès !";
        this.popupUsername = username;
        this.popupPassword = password;
        this.showPopupCredentials = true;
        this.afficherToast("Utilisateur ajouté avec succès !");
        this.actualiserListe();
      },
      error: (err) => {
        console.error(err);
        this.afficherToast("Erreur lors de l'ajout !");
      }
    });
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
