import { inject } from "@angular/core"
import { AuthService } from "../auth.service"
import { Router } from "@angular/router";

export const authGuardFn = ()=>{
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.isLogin || localStorage.getItem('token')){
    localStorage.setItem('token','9RP.12BJ.2018LIB.18AR.12FR.2022WC');
    return true;
  }else{
    router.navigateByUrl('login')
    return false;
  }
}
