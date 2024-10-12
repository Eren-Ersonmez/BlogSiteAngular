import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthUserService } from '../../../services/common/models/auth-user-service';
import { Router } from '@angular/router';
import { FormValidationService } from '../../../services/common/form-validation.service';
import { BaseComponentClass, SpinnerType } from '../../../base/base-component-class';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../../../services/common/custom-toastr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseComponentClass implements OnInit {

  loginForm;
  constructor(
    spinner:NgxSpinnerService,
    private formBuilder:FormBuilder,
    private authUserService:AuthUserService,
    private router:Router,
    private formValidationService:FormValidationService,
    private toastr:CustomToastrService
  ){
    super(spinner);
    this.loginForm=this.formBuilder.group({
      email:["",[Validators.email,Validators.required]],
      password:["",[Validators.required,Validators.minLength(4)]]
    })
  }
  ngOnInit(): void {
    this.showSpinner(SpinnerType.CubeTransition,true);
  }

  async onSubmit(){
    this.showSpinner(SpinnerType.CubeTransition);
    if(!this.loginForm.invalid){
     const result= await this.authUserService.IsAuthenticated(this.loginForm.value.email,this.loginForm.value.password)
     if(result){
      this.hideSpinner(SpinnerType.CubeTransition);
      this.toastr.message("Giriş Yapıldı","Başarılı",{
        toastrMessagePosition:ToastrMessagePosition.TopRight,
        toastrMessageType:ToastrMessageType.Success
      })
      localStorage.setItem("email",this.loginForm.value.email);
      localStorage.setItem("password",this.loginForm.value.password);
      this.router.navigateByUrl("admin");
     }
     else{
      this.hideSpinner(SpinnerType.CubeTransition);
      this.toastr.message("Email yada şifre yanlış","Hatalı",{
        toastrMessagePosition:ToastrMessagePosition.TopRight,
        toastrMessageType:ToastrMessageType.Error
      })
     }
    }
  }

  getValidationMessages(f:AbstractControl,name:string){
    return this.formValidationService.getValidationMessages(f,name);
  }
}
