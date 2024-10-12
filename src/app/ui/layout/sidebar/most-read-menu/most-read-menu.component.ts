import { Component } from '@angular/core';
import { Article } from '../../../../contracts/models/articles/article';
import { ArticleService } from '../../../../services/common/models/article.service';

@Component({
  selector: 'app-most-read-menu',
  templateUrl: './most-read-menu.component.html',
  styleUrl: './most-read-menu.component.scss'
})
export class MostReadMenuComponent {
  mostReadArticles: Article[] = [];

  constructor(private articleService: ArticleService) { }

  async ngOnInit(): Promise<void> {
    this.mostReadArticles = (await this.articleService.getMostReadArticles(()=>{},()=>{})).data;
  }
}
