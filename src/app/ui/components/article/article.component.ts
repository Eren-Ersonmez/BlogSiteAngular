import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../../contracts/models/articles/article';
import { HttpClientService } from '../../../services/common/http-client.service';
import { ArticleService } from '../../../services/common/models/article.service';
import { BaseComponentClass, SpinnerType } from '../../../base/base-component-class';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent extends BaseComponentClass implements OnInit {
  id:string;
  categoryName:string;
  articles:Article[]=[];
  constructor(private activedRoute:ActivatedRoute,private articleService:ArticleService,spinner:NgxSpinnerService){
    super(spinner);
  }

  async ngOnInit() {
    this.showSpinner(SpinnerType.Cog,true);
    this.activedRoute.paramMap.subscribe(async id=>{
      this.showSpinner(SpinnerType.Cog);
      if(id){
        this.id=this.activedRoute.snapshot.paramMap.get("id");
        this.categoryName=this.activedRoute.snapshot.paramMap.get("category");
        this.articles[0]=((await this.articleService.getArticle(this.id)).data);
        this.articles[0].viewCount+=1
        this.articles[0].categoryId=this.articles[0].category.id;
        await this.articleService.updateArticle(this.articles[0],()=>{
            this.hideSpinner(SpinnerType.Cog);
        },()=>{
            this.hideSpinner(SpinnerType.Cog);
        })
      }
    })


  }


}
