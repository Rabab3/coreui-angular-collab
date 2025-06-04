import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Article, ArticleService } from 'src/app/services/article.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-acorriger',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './acorriger.component.html',
  styleUrls: ['./acorriger.component.scss']
})
export class AcorrigerComponent implements OnInit {
  articles: Article[] = [];
  searchTerm: string = '';

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.getArticles().subscribe(data => {
      this.articles = data.filter(a => a.statut === 'À corriger');
    });
  }

  get articlesFiltres(): Article[] {
    return this.articles.filter(a =>
      a.titre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (a.retourCommentaire?.toLowerCase().includes(this.searchTerm.toLowerCase()) ?? false)
    );
  }

  voirContenu(article: Article) {
    alert(`Contenu de l'article :\n\n${article.contenu}`);
  }
}
