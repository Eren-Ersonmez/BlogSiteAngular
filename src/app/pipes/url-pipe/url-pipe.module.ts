import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UrlFormatPipe } from './url-format.pipe';



@NgModule({
  declarations: [
    UrlFormatPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    UrlFormatPipe
  ]
})
export class UrlPipeModule { }
