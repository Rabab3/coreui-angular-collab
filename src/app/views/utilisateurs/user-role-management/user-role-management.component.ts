import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-role-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-role-management.component.html',
  styleUrls: ['./user-role-management.component.scss']
})
export class UserRoleManagementComponent implements OnInit {
  utilisateurs: any[] = [];
  roles = ['admin', 'moderateur', 'contributeur', 'lecteur'];
  filtreRole = '';
  recherche = '';
  utilisateursFiltres: any[] = [];

  ngOnInit(): void {
    this.utilisateurs = [
      { id: 1, nom: 'Karim', prenom: 'Leïla', email: 'leila@example.com', role: 'contributeur' },
      { id: 2, nom: 'Dupont', prenom: 'Jean', email: 'jean@example.com', role: 'moderateur' },
      { id: 3, nom: 'Ali', prenom: 'Sara', email: 'sara@example.com', role: 'lecteur' }
    ];
    this.filtrer();
  }

  filtrer(): void {
    this.utilisateursFiltres = this.utilisateurs.filter(u => {
      const nomMatch = `${u.nom} ${u.prenom}`.toLowerCase().includes(this.recherche.toLowerCase());
      const roleMatch = this.filtreRole ? u.role === this.filtreRole : true;
      return nomMatch && roleMatch;
    });
  }

  changerRole(userId: number, nouveauRole: string) {
    const utilisateur = this.utilisateurs.find(u => u.id === userId);
    if (utilisateur) {
      utilisateur.role = nouveauRole;
      this.filtrer(); // MAJ vue filtrée
    }
  }
}
