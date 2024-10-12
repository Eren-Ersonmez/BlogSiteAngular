import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastrService:ToastrService) { }

  message(message:string,title:string,toastrServiceOptions:Partial<ToastrOptions>){
    this.toastrService[toastrServiceOptions.toastrMessageType](message,title,{
      positionClass:toastrServiceOptions.toastrMessagePosition,
     })

  }
}

export class ToastrOptions{
  toastrMessageType:ToastrMessageType=ToastrMessageType.Success
  toastrMessagePosition:ToastrMessagePosition=ToastrMessagePosition.BottomRight
}

export enum ToastrMessagePosition{
  TopRight = "toast-top-right",
  BottomRight = "toast-bottom-right",
  BottomLeft = "toast-bottom-left",
  TopLeft = "toast-top-left",
  TopFullWidth = "toast-top-full-width",
  BottomFullWidth = "toast-bottom-full-width",
  TopCenter = "toast-top-center",
  BottomCenter = "toast-bottom-center"

}

export enum ToastrMessageType{
  Success = "success",
  Info = "info",
  Warning = "warning",
  Error = "error"
}
