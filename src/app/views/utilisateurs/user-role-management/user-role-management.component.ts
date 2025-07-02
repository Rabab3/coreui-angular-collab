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
  showToast = false;

  ngOnInit(): void {
    this.utilisateurs = [
      { id: 1, nom: 'Mahrache', prenom: 'Rabab', email: 'Rabab.mahrache@example.com', role: 'contributeur' },
      { id: 2, nom: 'Moudrik', prenom: 'Laila', email: 'laila.moudrik@example.com', role: 'moderateur' },

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
    this.filtrer();
    this.showToast = true;
    setTimeout(() => this.showToast = false, 1900);
  }
}

  }
