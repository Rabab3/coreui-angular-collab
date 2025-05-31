import { Component } from '@angular/core';
import { CommonModule, NgFor, NgIf, NgClass, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, NgIf, NgClass, DatePipe],
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  providers: [DatePipe]
})
export class ArticleListComponent {
  searchText = '';
  selectedCategory = '';
  popupVisible = false;
  articleSelectionne: any = null;

  categories = ['RH', 'TECHNIQUE', 'SÉCURITÉ', 'METEOR'];

  articles = [
    {
      titre: 'Gestion RH collaborative',
      auteur: 'Rabab',
      categorie: 'RH',
      description: 'Un guide complet pour les processus RH modernisés.',
      contenu: 'Contenu complet de l’article RH...',
      statut: 'Publié',
      date: new Date('2024-04-10')
    },
    {
      titre: 'Déploiement sécurisé avec JWT',
      auteur: 'Laila',
      categorie: 'SÉCURITÉ',
      description: 'Comment sécuriser vos APIs avec JWT.',
      contenu: 'Contenu complet de l’article sécurité...',
      statut: 'Publié',
      date: new Date('2024-03-15')
    },
    {
      titre: 'Architecture Angular moderne',
      auteur: 'Admin',
      categorie: 'TECHNIQUE',
      description: 'Bonnes pratiques pour structurer vos projets Angular.',
      contenu: 'Contenu complet de l’article Angular...',
      statut: 'En attente',
      date: new Date('2024-03-01')
    }
  ];

  filteredArticles() {
    return this.articles.filter(article =>
      article.statut === 'Publié' &&
      article.titre.toLowerCase().includes(this.searchText.toLowerCase()) &&
      (this.selectedCategory === '' || article.categorie === this.selectedCategory)
    );
  }

  ouvrirPopup(article: any) {
    this.articleSelectionne = article;
    this.popupVisible = true;
    document.body.classList.add('modal-open');
  }

  fermerPopup() {
    this.popupVisible = false;
    this.articleSelectionne = null;
    document.body.classList.remove('modal-open');
  }

  ajouterAuxFavoris(article: any) {
    const favoris = JSON.parse(localStorage.getItem('favoris') || '[]');
    favoris.push(article);
    localStorage.setItem('favoris', JSON.stringify(favoris));
    alert('Article ajouté aux favoris !');
  }
}
