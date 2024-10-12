import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateComment } from '../../../contracts/models/comments/create-comment';
import { firstValueFrom, Observable } from 'rxjs';
import { Comment } from '../../../contracts/models/comments/comment';
import { CustomResponse } from '../../../contracts/customResponse';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClientService:HttpClientService){ }

  async addComment(comment:CreateComment,successCallBack:()=>void,errorCallBack:(error:string)=>void):Promise<Comment>{
    const observable:Observable<CustomResponse<Comment>>=this.httpClientService.post<CustomResponse<Comment>|any>({
      controller:"comments"
    },comment)
    const response=await firstValueFrom(observable) as CustomResponse<Comment>
    if(response.data)
      successCallBack();
    else
      errorCallBack(response.errors[0]);
    return response.data;
  }

  async getComments():Promise<Comment[]>{
    const observable:Observable<CustomResponse<Comment[]>>=this.httpClientService.get<CustomResponse<Comment[]>>({
      controller:"comments"
    })
    return (await firstValueFrom(observable)).data;
  }

  async getArticleComments(articleId:string,page:number,pageSize:number){
    const observable:Observable<CustomResponse<Comment[]>>=this.httpClientService.get<CustomResponse<Comment[]>>({
      controller:"comments",
      action:"GetArticleComments",
      queryString:`ArticleId=${articleId}&page=${page}&pageSize=${pageSize}`
    })
    return (await firstValueFrom(observable));
  }
}
