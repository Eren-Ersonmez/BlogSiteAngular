import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { UrlPipeModule } from '../../../pipes/url-pipe/url-pipe.module';



@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule,
    UrlPipeModule
  ],
  exports:[
    HomeComponent,
  ]
})
export class HomeModule { }
