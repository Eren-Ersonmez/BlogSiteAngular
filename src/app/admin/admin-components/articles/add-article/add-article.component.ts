import { Component,OnInit } from '@angular/core';
import { ArticleService } from '../../../../services/common/models/article.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../../services/common/models/category.service';
import { Category } from '../../../../contracts/models/categories/category';
import { FormValidationService } from '../../../../services/common/form-validation.service';
import { Router } from '@angular/router';
import { BaseComponentClass, SpinnerType } from '../../../../base/base-component-class';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../../../../services/common/custom-toastr.service';


@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent extends BaseComponentClass implements OnInit {

  fileData: File = null;
  picture: string = null;
  articleForm;
  categories: Category[];

  constructor(
    spinner:NgxSpinnerService,
    private categoryService: CategoryService,
    private articleService: ArticleService,
    private formBuilder: FormBuilder,
    private formValidationService: FormValidationService,
    private router: Router,
    private toastr:CustomToastrService
  ) {
    super(spinner);
    this.articleForm = this.formBuilder.group({
      title: ["", [Validators.required, Validators.minLength(6)]],
      contentSummary: ["", [Validators.required, Validators.minLength(50)]],
      content: ["", [Validators.required, Validators.minLength(150)]],
      categoryId: ["", [Validators.required]],
      picture: [""]
    });
  }

  async ngOnInit() {
    this.showSpinner(SpinnerType.Pacman)
    await this.getCategories();
  }
  async onSubmit() {
    this.showSpinner(SpinnerType.Pacman)
    this.articleForm.controls['picture'].setValue(this.picture);
    if (!this.articleForm.invalid) {
      await this.articleService.addArticle(this.articleForm.value, () => {
        this.hideSpinner(SpinnerType.Pacman);
        this.toastr.message("Makale eklendi","Başarılı",{
          toastrMessagePosition:ToastrMessagePosition.TopRight,
          toastrMessageType:ToastrMessageType.Success
        })
        this.router.navigateByUrl("/admin/articles");
      }, () => {
        this.hideSpinner(SpinnerType.Pacman);
        this.toastr.message("Makale eklenemedi","Başarısız",{
          toastrMessagePosition:ToastrMessagePosition.TopRight,
          toastrMessageType:ToastrMessageType.Error
        })
      });
    }
  }

  async uploadPicture(files) {
    this.showSpinner(SpinnerType.Pacman);
    this.fileData = files.target.files[0];
    const formData = new FormData();
    formData.append("picture", this.fileData);
    this.picture = (await this.articleService.saveArticlePicture(formData,()=>{
      this.hideSpinner(SpinnerType.Pacman);
    },()=>{
      this.hideSpinner(SpinnerType.Pacman);
    })).data;
  }

  async getCategories() {
    this.categories = (await this.categoryService.getCategories(()=>{
      this.hideSpinner(SpinnerType.Pacman);
    },()=>{
      this.hideSpinner(SpinnerType.Pacman);
    })).data;
  }

  getValidationMessages(f: AbstractControl, name: string) {
    return this.formValidationService.getValidationMessages(f, name);
  }
}
