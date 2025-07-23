import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleService, Article } from 'src/app/services/article.service';

@Component({
  selector: 'app-dashboard-contributeur',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-contributeur.component.html',
  styleUrls: ['./dashboard-contributeur.component.scss']
})
export class DashboardContributeurComponent implements OnInit {
  stats = [
    { label: 'Articles soumis', value: 0 },
    { label: 'Articles publiés', value: 0 },
    { label: 'Articles en attente', value: 0 }
  ];

  topArticles: Article[] = [];

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.loadStatsAndTopArticles();
  }

  loadStatsAndTopArticles(): void {
    this.articleService.getMesArticles().subscribe((articles: Article[]) => {
      this.stats = [
        { label: 'Articles soumis', value: articles.length },
        { label: 'Articles publiés', value: articles.filter(a => a.status === 'VALIDE').length },
        { label: 'Articles en attente', value: articles.filter(a => a.status === 'EN_ATTENTE').length }
      ];

      this.topArticles = articles
          .filter(article =>
              article.status === 'VALIDE' && !article.isDraft && article.vues !== undefined
          )
          .sort((a, b) => (b.vues ?? 0) - (a.vues ?? 0))
          .slice(0, 3);
    });
  }

}
