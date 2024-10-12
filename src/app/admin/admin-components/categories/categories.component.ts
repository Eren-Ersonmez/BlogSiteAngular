import { Component, ViewChild } from '@angular/core';
import { ListCategoryComponent } from './list-category/list-category.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  @ViewChild(ListCategoryComponent) listCompenent
  createdCategory(isAdded:boolean){
    if(isAdded)
     this.listCompenent.getCategories();
  }

}
