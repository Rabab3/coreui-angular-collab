import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-user-role-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-role-management.component.html',
  styleUrls: ['./user-role-management.component.scss']
})
export class UserRoleManagementComponent implements OnInit {
  utilisateurs: any[] = [];
  utilisateursFiltres: any[] = [];
  roles = ['ROLE_ADMIN', 'ROLE_MODERATEUR', 'ROLE_CONTRIBUTEUR', 'ROLE_LECTEUR'];
  filtreRole = '';
  recherche = '';
  showToast = false;

  constructor(private utilisateurService: UtilisateurService) {}

  ngOnInit(): void {
    this.utilisateurService.getAllUsers().subscribe({
      next: (data) => {
        this.utilisateurs = data;
        this.filtrer();
      },
      error: (err) => console.error("Erreur chargement utilisateurs", err)
    });
  }

  filtrer(): void {
    this.utilisateursFiltres = this.utilisateurs.filter(u => {
      const nomMatch = `${u.nom} ${u.prenom}`.toLowerCase().includes(this.recherche.toLowerCase());
      const roleMatch = this.filtreRole ? u.roles.includes(this.filtreRole) : true;
      return nomMatch && roleMatch;
    });
  }

  changerRole(userId: number, nouveauRole: string): void {
    this.utilisateurService.updateUserRole(userId, nouveauRole).subscribe({
      next: () => {
        const user = this.utilisateurs.find(u => u.id === userId);
        if (user) {
          user.roles = [nouveauRole];
          this.filtrer();
          this.showToast = true;
          setTimeout(() => this.showToast = false, 2000);
        }
      },
      error: (err) => console.error("Erreur mise à jour rôle", err)
    });
  }
}
