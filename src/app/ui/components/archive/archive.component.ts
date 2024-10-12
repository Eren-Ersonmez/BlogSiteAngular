import { Component, OnInit } from '@angular/core';
import { Article } from '../../../contracts/models/articles/article';
import { ArticleService } from '../../../services/common/models/article.service';
import { Archive } from '../../../contracts/models/archive';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrl: './archive.component.scss'
})
export class ArchiveComponent implements OnInit{
  page: number = 0;
  pageSize: number = 5;
  totalCount: number;
  articles:Article[]=[];
  archive:Archive=new Archive();

  constructor(
    private articleService:ArticleService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ){}

 async ngOnInit(){
  this.activatedRoute.paramMap.subscribe(async params => {
    this.archive.year = +params.get('year');
    this.archive.month = +params.get('month');
    await this.getArchiveArticles();
  });
    this.activatedRoute.queryParams.subscribe(async params => {
      if (params['page']) {
        this.page = +params['page'] - 1;
      } else {
        this.page = 0;
      }
      await this.getArchiveArticles();
    });

  }

  async getArchiveArticles(){
    const articlesResponse=await this.articleService.getArchiveArticles(this.archive.year,this.archive.month,this.page,this.pageSize)
    this.articles=articlesResponse.data
    this.totalCount=articlesResponse.dataTotalCount
  }
  async pageChanged(newPage: number) {
    this.page = newPage - 1;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { page: this.page + 1 },
      queryParamsHandling: 'merge'
    });
    await this.getArchiveArticles();
  }
}
