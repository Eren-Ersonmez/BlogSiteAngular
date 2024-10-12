import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryMenuComponent } from './category-menu/category-menu.component';
import { MostReadMenuComponent } from './most-read-menu/most-read-menu.component';
import { ArchiveMenuComponent } from './archive-menu/archive-menu.component';
import { SidebarComponent } from './sidebar.component';
import { RouterModule } from '@angular/router';
import { UrlPipeModule } from '../../../pipes/url-pipe/url-pipe.module';



@NgModule({
  declarations: [
    SidebarComponent,
    CategoryMenuComponent,
    MostReadMenuComponent,
    ArchiveMenuComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    UrlPipeModule
  ],
  exports:[
    CategoryMenuComponent,
    SidebarComponent
  ]
})
export class SidebarModule { }
