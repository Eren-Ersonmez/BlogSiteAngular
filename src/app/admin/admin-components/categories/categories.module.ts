import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { ListCategoryComponent } from './list-category/list-category.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { DeleteModule } from '../../../directives/delete.module';


@NgModule({
  declarations: [
    CategoriesComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    ListCategoryComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    DeleteModule,

  ],
  exports:[
    AddCategoryComponent,
    EditCategoryComponent,
    ListCategoryComponent
  ]
})
export class CategoriesModule { }
