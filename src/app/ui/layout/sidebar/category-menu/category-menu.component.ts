import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../services/common/models/category.service';
import { Category } from '../../../../contracts/models/categories/category';
import { SharedService } from '../../../../services/common/shared.service';
import { Router } from '@angular/router';
import { UrlFormatPipe } from '../../../../pipes/url-pipe/url-format.pipe';

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrl: './category-menu.component.scss',
})
export class CategoryMenuComponent implements OnInit {

  categories:Category[]=[];

  constructor(private categoryService:CategoryService,private sharedService:SharedService,private router:Router){}

  async ngOnInit(){
    this.categories=(await this.categoryService.getCategories(()=>{},()=>{})).data;
  }

  getCategoryArticles(categoryId:string,categoryName:string){
    this.sharedService.changeIdOrAny(categoryId);
    this.router.navigate(['/categories',categoryName,categoryId]);
  }
}
