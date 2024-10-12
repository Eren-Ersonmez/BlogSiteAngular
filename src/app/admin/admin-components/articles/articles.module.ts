import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesComponent } from './articles.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { DeleteDirective } from '../../../directives/delete.directive';
import { DeleteModule } from '../../../directives/delete.module';

@NgModule({
  declarations: [
    ArticlesComponent,
    AddArticleComponent,
    EditArticleComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    ReactiveFormsModule,
    DeleteModule,
    RouterModule.forChild([
      {
        path:"",
        component:ArticlesComponent
      },
      {
        path:"addArticle",
        component:AddArticleComponent
      },
      {
        path:"editArticle/:id",
        component:EditArticleComponent
      }
    ])
  ]
})
export class ArticlesModule { }
