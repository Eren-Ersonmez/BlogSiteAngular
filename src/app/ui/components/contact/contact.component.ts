import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { HelperService } from '../../../services/common/helper.service';
import { FormValidationService } from '../../../services/common/form-validation.service';
import { BaseComponentClass, SpinnerType } from '../../../base/base-component-class';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../../../services/common/custom-toastr.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent extends BaseComponentClass implements OnInit {

  contactForm;
  constructor(spinner:NgxSpinnerService,
    private toastr:CustomToastrService,
    private fb:FormBuilder,
    private helperService:HelperService,
    private formValidationService:FormValidationService){
    super(spinner);
    this.contactForm=this.fb.group({
      name:['',[Validators.required,Validators.minLength(6)]],
      email:['',[Validators.required,Validators.email]],
      subject:['',[Validators.required,Validators.minLength(6)]],
      body:['',[Validators.required,Validators.minLength(6)]]
    })
  }
  ngOnInit(): void {
   this.showSpinner(SpinnerType.Fire,true);
  }
  async onSubmit(){
    this.showSpinner(SpinnerType.Fire);
    if (this.contactForm.valid) {
      await this.helperService.sendContactMail(this.contactForm.value,()=>{
        this.hideSpinner(SpinnerType.Fire);
        this.toastr.message("Mesajını başarılı bir şekilde iletildi en kısa zamanda dönüş yapılacak","İletildi",{
          toastrMessagePosition:ToastrMessagePosition.TopRight,
          toastrMessageType:ToastrMessageType.Success
        })
      },()=>{
        this.hideSpinner(SpinnerType.Fire);
        this.toastr.message("Beklenmeyen bir hata oluştu","Başarısız",{
          toastrMessagePosition:ToastrMessagePosition.TopRight,
          toastrMessageType:ToastrMessageType.Error
        })
      })
    } else {
      this.hideSpinner(SpinnerType.Fire);
      this.toastr.message("Hatalı bilgiler girdiniz lütfen doğru bilgiler girin","Hatalı",{
        toastrMessagePosition:ToastrMessagePosition.TopRight,
        toastrMessageType:ToastrMessageType.Warning
      })
    }
  }

  getValidationMessages(f:AbstractControl,name:string){
    return this.formValidationService.getValidationMessages(f,name);
  }
}
