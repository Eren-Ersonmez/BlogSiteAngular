import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient:HttpClient,@Inject("baseUrl") private baseUrl: string) { }

  private url(request:Partial<RequestParameters>){
    return `${request.baseUrl ? request.baseUrl:this.baseUrl}/${request.controller}${request.action ? `/${request.action}`:''}`;
  }

  get<T>(request:Partial<RequestParameters>,id?:string):Observable<T>{
     let url="";
     if(request.fullEndPoint)
      url=request.fullEndPoint;
     else
      url=`${this.url(request)}${id ? `/${id}`:''}${request.queryString ? `?${request.queryString}`:''}`;

    return this.httpClient.get<T>(url,{headers:new HttpHeaders({
      'Content-Type': 'application/json',
    }),responseType:request.responseType as "json"})
  }

  delete<T>(request:Partial<RequestParameters>,id:string):Observable<T>{
    let url="";
    if(request.fullEndPoint)
      url=request.fullEndPoint;
    else
      url=`${this.url(request)}/${id}${request.queryString ? `/${request.queryString}`:''}`;

    return this.httpClient.delete<T>(url,{headers:new HttpHeaders({
      'Content-Type': 'application/json',
    }),responseType:request.responseType as "json"})
  }

  put<T>(request:Partial<RequestParameters>,body?:Partial<T>):Observable<T>{
    let url="";
    if(request.fullEndPoint)
      url=request.fullEndPoint;
    else
      url=`${this.url(request)}${request.queryString ? `/${request.queryString}`:''}`;

      return this.httpClient.put<T>(url,body,{headers:new HttpHeaders({
        'Content-Type': 'application/json',
      }),responseType:request.responseType as "json"})
  }

  post<T>(request:Partial<RequestParameters>,body:Partial<T>):Observable<T>{
    let url="";
    if(request.fullEndPoint)
      url=request.fullEndPoint;
    else
    url=`${this.url(request)}${request.queryString ? `/${request.queryString}`:''}`;

    return this.httpClient.post<T>(url,body,{headers:new HttpHeaders({
      'enctype': 'multipart/form-data'
    }),responseType:request.responseType as "json"})
  }
}
export class RequestParameters{
  controller?:string;
  action?:string;
  queryString?:string;
  header:HttpHeaders;
  baseUrl?:string;
  fullEndPoint?: string;
  responseType?: string = 'json';

}
