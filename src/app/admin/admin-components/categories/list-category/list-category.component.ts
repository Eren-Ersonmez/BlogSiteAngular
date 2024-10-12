import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from '../../../../contracts/models/categories/category';
import { MatPaginator } from '@angular/material/paginator';
import { CategoryService } from '../../../../services/common/models/category.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.scss'
})
export class ListCategoryComponent implements OnInit {

  page:number;
  pageSize:number;
  displayedColumns: string[] = ['name','delete','edit'];
  dataSource : MatTableDataSource<Category>
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private categoryService:CategoryService){}

  async ngOnInit(){
   await this.getCategories();
  }

  async getCategories(){
    const categoriesResponse=(await this.categoryService.getCategories(()=>{},()=>{}));
    this.dataSource = new MatTableDataSource<Category>(categoriesResponse.data);
    this.dataSource.paginator = this.paginator;
  }
  async pageChanged() {
    await this.getCategories();
  }

}
