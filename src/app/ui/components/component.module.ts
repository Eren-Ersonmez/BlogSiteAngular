import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutModule } from './about/about.module';
import { ContactModule } from './contact/contact.module';
import { HomeModule } from './home/home.module';
import { ArticleModule } from './article/article.module';
import { ArchiveModule } from './archive/archive.module';
import { LoginModule } from './login/login.module';
import { CommentsModule } from './comments/comments.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AboutModule,
    ContactModule,
    HomeModule,
    ArticleModule,
    ArchiveModule,
    LoginModule,
  ]
})
export class ComponentModule { }
