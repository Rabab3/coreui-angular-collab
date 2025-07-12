import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService, Article } from 'src/app/services/article.service';
import { ThemeService, Thématique } from 'src/app/services/theme.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-article-details',
  standalone: true,
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class ArticleDetailsComponent implements OnInit {
  article?: Article;
  commentaire = '';
  commentaires: string[] = [];
  articleId!: number;
  theme?: Thématique;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.articleId = +this.route.snapshot.paramMap.get('id')!;
    this.articleService.getArticleById(this.articleId).subscribe(article => {
      this.article = article;

      if (article) {
        const theme = this.themeService.getThemeById(article.themeId);
        if (theme) this.theme = theme;
      }
    });

    const saved = localStorage.getItem('commentaires-' + this.articleId);
    this.commentaires = saved ? JSON.parse(saved) : [];
  }

  envoyerCommentaire() {
    if (this.commentaire.trim()) {
      this.commentaires.push(this.commentaire);
      localStorage.setItem('commentaires-' + this.articleId, JSON.stringify(this.commentaires));
      this.commentaire = '';
    }
  }
   hasTags(): boolean {
    return Array.isArray(this.article?.tags) && this.article?.tags.length > 0;
  }
}
