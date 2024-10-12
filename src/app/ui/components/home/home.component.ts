import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticleService } from '../../../services/common/models/article.service';
import { Article } from '../../../contracts/models/articles/article';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../../services/common/shared.service';
import { GuidService } from '../../../services/common/guid.service';
import { Archive } from '../../../contracts/models/archive';
import { BaseComponentClass, SpinnerType } from '../../../base/base-component-class';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent extends BaseComponentClass implements OnInit,OnDestroy {

  page: number = 0;
  articles: Article[] = [];
  pageSize: number = 5;
  totalCount: number;
  categoryId: string;
  archives:Archive[];

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    private guidService:GuidService,
    spinner:NgxSpinnerService
  ) {
    super(spinner);
  }
  ngOnDestroy(): void {
    this.categoryId=null;
    this.sharedService.changeIdOrAny(null)
  }

  async ngOnInit() {
    this.showSpinner(SpinnerType.BallAtom);
    this.sharedService.currentIdOrAny.subscribe(id => {
      this.categoryId = id;
      this.loadArticles();
    });

    this.activatedRoute.queryParams.subscribe(params => {
      if (params['page']) {
        this.page = +params['page'] - 1;
      } else {
        this.page = 0;
      }
      this.loadArticles();
    });
  }

  async loadArticles() {
    if (this.categoryId) {
      if(this.guidService.isGuid(this.categoryId)){
        await this.getCategoryArticles(this.categoryId);
      }
      else{
        this.articles=(await this.articleService.searchArticles(this.categoryId,this.page,this.pageSize,()=>{
          this.hideSpinner(SpinnerType.BallAtom);
        },()=>{
          this.hideSpinner(SpinnerType.BallAtom);
        })).data
      }
    }
    else if(this.activatedRoute.snapshot.paramMap.get("id")){
      await this.getCategoryArticles(this.activatedRoute.snapshot.paramMap.get("id"));
    }
     else {
      await this.getAllArticles();
    }
  }

  async getAllArticles() {
    const articleResponse = await this.articleService.getPageArticles(this.page, this.pageSize,()=>{
      this.hideSpinner(SpinnerType.BallAtom);
    },()=>{
      this.hideSpinner(SpinnerType.BallAtom);
    });
    this.articles = articleResponse.data;
    this.totalCount = articleResponse.dataTotalCount;
  }

  async getCategoryArticles(id: string) {
    this.showSpinner(SpinnerType.BallAtom)
    const articleResponse = await this.articleService.getCategoryArticles(id, this.page, this.pageSize,()=>{
      this.hideSpinner(SpinnerType.BallAtom);
    },()=>{
      this.hideSpinner(SpinnerType.BallAtom);
    });
    this.articles = articleResponse.data;
    this.totalCount = articleResponse.dataTotalCount;
  }

  pageChanged(newPage: number) {
    this.page = newPage - 1;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { page: this.page + 1 },
      queryParamsHandling: 'merge'
    });
    this.loadArticles();
  }
}
