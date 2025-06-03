import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService, Article } from 'src/app/services/article.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-details',
  standalone: true,
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss'],
  imports: [CommonModule]
})
export class ArticleDetailsComponent implements OnInit {
  article?: Article;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.article = this.articleService.getArticleById(id);
  }
}
