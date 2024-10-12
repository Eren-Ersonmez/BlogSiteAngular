import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Article } from '../../../contracts/models/articles/article';
import { MatPaginator } from '@angular/material/paginator';
import { ArticleService } from '../../../services/common/models/article.service';
import { BaseComponentClass, SpinnerType } from '../../../base/base-component-class';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss'
})
export class ArticlesComponent extends BaseComponentClass {
  displayedColumns: string[] = ['picture','title','category','viewCount','commentsCount','createdDate','delete','edit'];
  dataSource : MatTableDataSource<Article>=null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(spinner:NgxSpinnerService,private articleService: ArticleService) {
    super(spinner);
  }

  async ngOnInit(){
    this.getArticles();
  }
  async getArticles() {
      this.showSpinner(SpinnerType.SquareJellyBox)
      const categoriesResponse=await (await this.articleService.getPageArticles
      (this.paginator ?this.paginator.pageIndex:0,this.paginator ?this.paginator.pageSize:5,()=>{
       this.hideSpinner(SpinnerType.SquareJellyBox);
      },()=>{
        this.hideSpinner(SpinnerType.SquareJellyBox);
      }))
      this.dataSource = new MatTableDataSource<Article>(categoriesResponse.data)
      this.paginator.length=categoriesResponse.dataTotalCount
  }
  async pageChanged() {
    await this.getArticles();
  }

}
