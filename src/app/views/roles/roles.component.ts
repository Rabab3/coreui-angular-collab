import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent {

  constructor(private utilisateurService: UtilisateurService) {}

  onRoleChange(userId: number, newRole: string): void {
    this.utilisateurService.updateUserRole(userId, newRole).subscribe({
      next: () => console.log('✅ Rôle mis à jour'),
      error: (err: any) => console.error('❌ Erreur mise à jour rôle', err)
    });
  }

}
