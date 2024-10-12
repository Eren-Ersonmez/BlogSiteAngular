import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchiveComponent } from './archive.component';
import { RouterModule } from '@angular/router';
import { UrlPipeModule } from '../../../pipes/url-pipe/url-pipe.module';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    ArchiveComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    UrlPipeModule,
    NgxPaginationModule
  ]
})
export class ArchiveModule { }
