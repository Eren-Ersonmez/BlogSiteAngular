import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Category } from '../../../../contracts/models/categories/category';
import { CategoryService } from '../../../../services/common/models/category.service';
import { ArticleService } from '../../../../services/common/models/article.service';
import { FormValidationService } from '../../../../services/common/form-validation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../../../../contracts/models/articles/article';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../../../../services/common/custom-toastr.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrl: './edit-article.component.scss'
})
export class EditArticleComponent {
  fileData: File = null;
  picture: string = null;
  articleForm;
  categories: Category[];
  articleId:string;
  articleData:Article;

  constructor(
    private categoryService: CategoryService,
    private articleService: ArticleService,
    private formBuilder: FormBuilder,
    private formValidationService: FormValidationService,
    private router: Router,
    private activatedRoute:ActivatedRoute,
    private toastr:CustomToastrService
  ) {
    this.articleForm = this.formBuilder.group({
      title: ["", [Validators.required, Validators.minLength(6)]],
      contentSummary: ["", [Validators.required, Validators.minLength(50)]],
      content: ["", [Validators.required, Validators.minLength(150)]],
      categoryId: ["", [Validators.required]],
      picture: [""]
    });
  }

  async ngOnInit() {
    await this.getCategories();
    this.articleId=this.activatedRoute.snapshot.paramMap.get("id");
    this.articleData=(await this.articleService.getArticle(this.articleId)).data;
    this.articleForm.patchValue({
      title: this.articleData.title,
      contentSummary: this.articleData.contentSummary,
      content: this.articleData.content,
      categoryId: this.articleData.categoryId,
      picture: this.articleData.picture
    });
  }
  async onSubmit() {
    this.articleForm.controls['picture'].setValue(this.picture);
    if (!this.articleForm.invalid) {
      this.articleData.title=this.articleForm.value.title;
      this.articleData.categoryId=this.articleForm.value.categoryId;
      this.articleData.contentSummary=this.articleForm.value.contentSummary;
      this.articleData.content=this.articleForm.value.content;
      if(this.picture)
          this.articleData.picture=this.picture;

      await this.articleService.updateArticle(this.articleData, () => {
        this.toastr.message("Makale Güncellendi","Başarılı",{
          toastrMessagePosition:ToastrMessagePosition.TopRight,
          toastrMessageType:ToastrMessageType.Success
        })
        this.router.navigateByUrl("/admin/articles");
      }, () => {
        this.toastr.message("Makale Güncellenemedi","Başarısız",{
          toastrMessagePosition:ToastrMessagePosition.TopRight,
          toastrMessageType:ToastrMessageType.Error
        })
      });
    }
  }

  async uploadPicture(files) {
    this.fileData = files.target.files[0];
    const formData = new FormData();
    formData.append("picture", this.fileData);
    this.picture = (await this.articleService.saveArticlePicture(formData)).data;
  }

  async getCategories() {
    this.categories = (await this.categoryService.getCategories()).data;
  }

  getValidationMessages(f: AbstractControl, name: string) {
    return this.formValidationService.getValidationMessages(f, name);
  }
}
