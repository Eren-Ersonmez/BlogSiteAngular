import { Component, EventEmitter, Output } from '@angular/core';
import { CategoryService } from '../../../../services/common/models/category.service';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../../../../services/common/custom-toastr.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {

  constructor(private toastr:CustomToastrService,private categoryService:CategoryService){}

  @Output() createdCategory: EventEmitter<boolean> = new EventEmitter();

  async createCategory(name:string){
    await this.categoryService.addCategory({name},
      ()=>{
        this.toastr.message("Kategori Eklendi","Başarılı",{
          toastrMessagePosition:ToastrMessagePosition.TopRight,
          toastrMessageType:ToastrMessageType.Success
        })
        this.createdCategory.emit(true);
      },
      (error)=>{
        this.toastr.message("Kategori Eklenemedi","Başarısız",{
          toastrMessagePosition:ToastrMessagePosition.TopRight,
          toastrMessageType:ToastrMessageType.Error
        })
        this.createdCategory.emit(false);
      }
    )

  }
}
