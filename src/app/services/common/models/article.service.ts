import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom, Observable } from 'rxjs';
import { CustomResponse } from '../../../contracts/customResponse';
import { Article } from '../../../contracts/models/articles/article';
import { CreateArticle } from '../../../contracts/models/articles/create-article';
import { UpdateArticle } from '../../../contracts/models/articles/update-article';
import { Archive } from '../../../contracts/models/archive';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private httpClientService:HttpClientService) { }

  async getPageArticles( page: number = 0,size: number = 5,successCallBack?:()=>void,errorCallBack?:()=>void){
    const observable:Observable<CustomResponse<Article[]>>=this.httpClientService.get<CustomResponse<Article[]>>({
      controller:"articles",
      action:"GetPageArticles",
      queryString:`page=${page}&pageSize=${size}`
    })

    const response= await firstValueFrom(observable);

    if(response.data)
      successCallBack();
    else
      errorCallBack();

    return response;
  }

  async getCategoryArticles(categoryId:string,page: number = 0,size: number = 5,successCallBack?:()=>void,errorCallBack?:()=>void){
    const observable:Observable<CustomResponse<Article[]>>=this.httpClientService.get<CustomResponse<Article[]>>({
      controller:"articles",
      action:"GetCategoryArticles",
      queryString:`CategoryId=${categoryId}&page=${page}&pageSize=${size}`
    })

    const response= await firstValueFrom(observable);

    if(response.data)
      successCallBack();
    else
      errorCallBack();

    return response;
  }

  async getArticles(successCallBack?:()=>void,errorCallBack?:()=>void){
    const observable:Observable<CustomResponse<Article[]>>=this.httpClientService.get<CustomResponse<Article[]>>({
      controller:"articles"
      })
      const response= await firstValueFrom(observable);

      if(response.data)
        successCallBack();
      else
        errorCallBack();

      return response;
  }

  async getArticle(id:string,successCallBack?:()=>void,errorCallBack?:()=>void){
    const observable:Observable<CustomResponse<Article>>=this.httpClientService.get<CustomResponse<Article>>({
      controller:"articles"
    },id)
    const response= await firstValueFrom(observable);

      if(response.data)
        successCallBack();
      else
        errorCallBack();

      return response;
  }

  async addArticle(article:CreateArticle,successCallBack:()=>void,errorCallBack:(error:string)=>void){
    debugger;
    const observable:Observable<CustomResponse<Article>>=this.httpClientService.post<CustomResponse<Article>|any>({
      controller:"articles"
    },article)
    const response=await firstValueFrom(observable) as CustomResponse<Article>
    if(response.data)
      successCallBack();
    else
      errorCallBack(response.errors[0])
  }

  async updateArticle(article:UpdateArticle,successCallBack?:()=>void,errorCallBack?:(error:string)=>void){
    const observable:Observable<CustomResponse<boolean>>=this.httpClientService.put<CustomResponse<boolean>|any>({
      controller:"articles"
    },article)
    const response=await firstValueFrom(observable) as CustomResponse<boolean>
    if(response.data==true){
      successCallBack();
    }
    else
      errorCallBack(response.errors[0]);
  }

  async searchArticles(searchText:string,page: number = 0,size: number = 5,successCallBack?:()=>void,errorCallBack?:()=>void){
    const observable:Observable<CustomResponse<Article[]>>=this.httpClientService.get<CustomResponse<Article[]>>({
      controller:"articles",
      action:"SearchArticles",
      queryString:`searchText=${searchText}&page=${page}&pageSize=${size}`
    })

    const response= await firstValueFrom(observable);

    if(response.data)
      successCallBack();
    else
      errorCallBack();

    return response;
  }

  async getMostReadArticles(successCallBack?:()=>void,errorCallBack?:()=>void){
    const observable:Observable<CustomResponse<Article[]>>=this.httpClientService.get<CustomResponse<Article[]>>({
      controller:"articles",
      action:"getMostReadArticles"
    })
    const response= await firstValueFrom(observable);

    if(response.data)
      successCallBack();
    else
      errorCallBack();

    return response;
  }

  async getArticlesArchive(successCallBack?:()=>void,errorCallBack?:()=>void){
    const observable:Observable<CustomResponse<Archive[]>>=this.httpClientService.get<CustomResponse<Archive[]>>({
      controller:"articles",
      action:"GetArticlesArchive"
    })
    const response= await firstValueFrom(observable);

    if(response.data)
      successCallBack();
    else
      errorCallBack();

    return response;
  }

  async getArchiveArticles(year:number,month:number,page:number,pageSize:number,successCallBack?:()=>void,errorCallBack?:()=>void){
    const observable:Observable<CustomResponse<Article[]>>=this.httpClientService.post<CustomResponse<Article[]>|any>({
      controller:"articles",
      action:"GetArchiveArticles"
    },{Year:year,Month:month,Page:page,PageSize:pageSize})
    const response= await firstValueFrom(observable) as CustomResponse<Article[]>
    if(response.data)
      successCallBack();
    else
      errorCallBack();

    return response;
  }

  async saveArticlePicture(picture,successCallBack?:()=>void,errorCallBack?:()=>void){
    const observable:Observable<CustomResponse<string>>=this.httpClientService.post<CustomResponse<string>|any>({
      controller:"articles",
      action:"SaveArticlePicture"
    },picture)
    const response= await firstValueFrom(observable) as CustomResponse<string>;
    if(response.data)
      successCallBack();
    else
      errorCallBack();

    return response;
  }

}
