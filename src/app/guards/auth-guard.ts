
import { CanActivateFn, Router } from '@angular/router';
import { AuthUserService } from '../services/common/models/auth-user-service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = async (route, state) => {
  const authUserService:AuthUserService=inject(AuthUserService);
  const router= inject(Router);
  const email= localStorage.getItem("email");
  const password= localStorage.getItem("password");
  const result= await authUserService.IsAuthenticated(email,password);
  if(result){
     return true;
  }
  router.navigateByUrl("");
  return false;
};
