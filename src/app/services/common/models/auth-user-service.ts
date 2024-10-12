import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom, Observable } from 'rxjs';
import { CustomResponse } from '../../../contracts/customResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  constructor(private httpClientService:HttpClientService) { }

  async IsAuthenticated(email:string,password:string){
    const observable:Observable<CustomResponse<boolean>>=this.httpClientService.post<CustomResponse<boolean>|any>({
      controller:"auth"
    },{Email:email,Password:password})

    const response=await firstValueFrom(observable) as CustomResponse<boolean>
    return response.data;
  }
}
