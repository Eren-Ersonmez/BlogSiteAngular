import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { SendContactMail } from '../../constants/send-contact-mail';
import { firstValueFrom, Observable } from 'rxjs';
import { CustomResponse } from '../../contracts/customResponse';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private httpClientService:HttpClientService) { }

  async sendContactMail(contact:SendContactMail,successCallBack?:()=>void,errorCallBack?:()=>void){
    const observable:Observable<CustomResponse<boolean>>=this.httpClientService.post<CustomResponse<boolean>|any>({
     controller:"helper",
     action:"SendContactMail"
    },contact)

    const response=await firstValueFrom(observable) as CustomResponse<boolean>
    if(response.data==true)
      successCallBack();
    else
      errorCallBack();
    return response;
  }
}
