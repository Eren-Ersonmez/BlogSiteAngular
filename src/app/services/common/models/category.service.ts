import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom, Observable } from 'rxjs';
import { CustomResponse } from '../../../contracts/customResponse';
import { Category } from '../../../contracts/models/categories/category';
import { CreateCategory } from '../../../contracts/models/categories/create-category';
import { UpdateCategory } from '../../../contracts/models/categories/update-category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClientService:HttpClientService) { }

  async getCategories(successCallBack?:()=>void,errorCallBack?:()=>void){
    const observable:Observable<CustomResponse<Category[]>>=this.httpClientService.get<CustomResponse<Category[]>>({
      controller:"categories",
    })
    const response= await firstValueFrom(observable)
    if(response.data)
      successCallBack();
    else
      errorCallBack();
    return response;
  }

  async getCategory(id:string,successCallBack?:()=>void,errorCallBack?:()=>void){
    const observable:Observable<CustomResponse<Category>>=this.httpClientService.get<CustomResponse<Category>>({
      controller:"categories",
    },id)
    const response= await firstValueFrom(observable)
    if(response.data)
      successCallBack();
    else
      errorCallBack();
    return response;
  }

  async addCategory(createCategory:CreateCategory,successCallBack?:()=>void,errorCallBack?:(error:string)=>void){
    const observable:Observable<CustomResponse<Category>>=this.httpClientService.post<CustomResponse<Category>|any>({
      controller:"categories"
    },createCategory)

    const response= await firstValueFrom(observable) as CustomResponse<Category>
    if(response.data)
      successCallBack();
    else
      errorCallBack(response.errors[0])
  }

  async updateCategory(updateCategory:UpdateCategory,successCallBack?:()=>void,errorCallBack?:(error:string)=>void){
    const observable:Observable<CustomResponse<boolean>>=this.httpClientService.put<CustomResponse<boolean>|any>({
      controller:"cateogries"
    },updateCategory)

    const response= await firstValueFrom(observable) as CustomResponse<boolean>
    if(response.data==true)
      successCallBack();
    else
      errorCallBack(response.errors[0])
  }

}
