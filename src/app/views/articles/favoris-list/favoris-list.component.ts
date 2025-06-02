  import { Component, OnInit } from '@angular/core';
  import { CommonModule, NgIf, NgFor, DatePipe } from '@angular/common';

  @Component({
    selector: 'app-favoris-list',
    standalone: true,
    imports: [CommonModule, NgIf, NgFor, DatePipe],
    templateUrl: './favoris-list.component.html',
    styleUrls: ['./favoris-list.component.scss'],
    providers: [DatePipe]
  })
  export class FavorisListComponent implements OnInit {
    favoris: any[] = [];

    ngOnInit(): void {
      const data = localStorage.getItem('favoris');
      this.favoris = data ? JSON.parse(data) : [];
    }

    supprimer(index: number) {
      this.favoris.splice(index, 1);
      localStorage.setItem('favoris', JSON.stringify(this.favoris));
    }

    viderFavoris() {
      if (confirm('Supprimer tous les favoris ?')) {
        this.favoris = [];
        localStorage.removeItem('favoris');
      }
    }
  }
