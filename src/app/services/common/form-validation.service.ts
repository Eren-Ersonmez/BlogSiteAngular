import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  getValidationMessages(f:AbstractControl,name:string){
    if(f.errors){
      for(let error in f.errors)
      {
        if(error=="required")
          return `${name} alanı boş bırakılamaz`;
        else if(error=="email")
          return `Lütfen doğru formatta email yazın`;
        else if(error=="minlength")
          return `${name} en az ${this.getMinLength(f)} karakter olmalı`;
      }
    }
    return ``;
  }
  getMinLength(control: AbstractControl) {
    if (control && control.validator) {
      const errors: ValidationErrors | null = control.errors;
      if (errors && errors['minlength']) {
        return errors['minlength'].requiredLength;
      }
    }
    return null;
  }
}
