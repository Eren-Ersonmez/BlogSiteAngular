import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Comment } from '../../../contracts/models/comments/comment';
import { FormValidationService } from '../../../services/common/form-validation.service';
import { CommentService } from '../../../services/common/models/comment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateComment } from '../../../contracts/models/comments/create-comment';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../../../services/common/custom-toastr.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit {

  commentForm;
  createComment=new CreateComment();
  page:number=0;
  pageSize:number=5;
  comments:Comment[]=[];
  articleId:string;

  constructor(
    private formBuilder:FormBuilder,
    private formValidationService:FormValidationService,
    private commentService:CommentService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private toastr:CustomToastrService
  ){
    this.commentForm=this.formBuilder.group({
      commentedBy:['',[Validators.required,Validators.minLength(10)]],
      content:['',[Validators.required,Validators.minLength(10)]]
    })
  }


   pageChanged(newPage: number) {
    this.page = newPage - 1;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { page: this.page + 1 },
      queryParamsHandling: 'merge'
    });
      this.getComments();
    }


  async ngOnInit(){
    await this.getComments();
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['page']) {
        this.page = +params['page'] - 1;
      } else {
        this.page = 0;
      }
      this.getComments();
    });
  }

  async onSubmit(){
    if(!this.commentForm.invalid){
       this.createComment.articleId=this.articleId;
       this.createComment.commentedBy=this.commentForm.value.commentedBy;
       this.createComment.content=this.commentForm.value.content;
       await this.commentService.addComment(this.createComment,async()=>{
        this.toastr.message("Yorum başarıyla eklendi","Başarılı",{
          toastrMessagePosition:ToastrMessagePosition.TopRight,
          toastrMessageType:ToastrMessageType.Success
        })
        await this.getComments();
       },()=>{
        this.toastr.message("Yorum eklenirken bir hata oluştu","Başarısız",{
          toastrMessagePosition:ToastrMessagePosition.TopRight,
          toastrMessageType:ToastrMessageType.Error
        })
       })
    }
  }
  async getComments(){
    this.articleId=this.activatedRoute.snapshot.paramMap.get("id");
    this.comments=(await this.commentService.getArticleComments(this.articleId,this.page,this.pageSize)).data;
  }

  getValidationMessages(f:AbstractControl,name:string){
    return this.formValidationService.getValidationMessages(f,name);
  }

}
